import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      shipping_address,
      items
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
    }

    // HMAC-SHA256 signature verification using secret key (server-side only)
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ success: false, error: "Signature mismatch — payment not verified" }, { status: 400 });
    }

    // Payment is genuine — create Shiprocket order in background/safe block
    let shiprocketOrderCreated = false;
    let shiprocketError = null;
    let shiprocketData = null;

    if (shipping_address && items && items.length > 0) {
      try {
        console.log("[Shiprocket] Starting integration workflow...");
        // 1. Authenticate with Shiprocket
        const authRes = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: process.env.SHIPROCKET_EMAIL,
            password: process.env.SHIPROCKET_PASSWORD,
          }),
        });

        if (!authRes.ok) {
          const errText = await authRes.text();
          throw new Error(`Shiprocket credentials login failed: ${errText}`);
        }

        const authData = await authRes.json();
        const token = authData.token;

        // 2. Prepare ad-hoc order payload
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const orderDateStr = `${year}-${month}-${day} ${hours}:${minutes}`;

        const orderItems = items.map((item: any) => ({
          name: `${item.name} (${item.grade})`,
          sku: `${item.id}-${item.grade.replace(/\s+/g, "-")}-${item.size}`,
          units: item.quantity,
          selling_price: item.price,
        }));

        const totalWeight = items.reduce((sum: number, item: any) => {
          // Calculate weight (defaulting to 0.3kg per 250g canister/bag)
          const unitWeight = item.size.toLowerCase().includes("250g") ? 0.3 : 0.3;
          return sum + (unitWeight * item.quantity);
        }, 0);

        const subTotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

        const shiprocketPayload = {
          order_id: razorpay_payment_id,
          order_date: orderDateStr,
          pickup_location: "Munnar", // Default pickup address configured in Shiprocket
          billing_customer_name: shipping_address.name.split(" ")[0] || "Customer",
          billing_last_name: shipping_address.name.split(" ").slice(1).join(" ") || "Millennium",
          billing_address: shipping_address.address,
          billing_address_2: shipping_address.address_2 || "",
          billing_city: shipping_address.city,
          billing_pincode: shipping_address.pincode,
          billing_state: shipping_address.state,
          billing_country: "India",
          billing_email: shipping_address.email || "info@millenniumtea.com",
          billing_phone: shipping_address.phone,
          shipping_is_billing: true,
          order_items: orderItems,
          payment_method: "Prepaid",
          sub_total: subTotal,
          length: 12,
          breadth: 12,
          height: 12,
          weight: Number(totalWeight.toFixed(2)),
        };

        // 3. Post order to Shiprocket
        const createRes = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(shiprocketPayload),
        });

        shiprocketData = await createRes.json();

        if (createRes.ok) {
          shiprocketOrderCreated = true;
          console.log("[Shiprocket] Order created successfully:", shiprocketData);
        } else {
          console.error("[Shiprocket] Order creation endpoint failed:", shiprocketData);
          shiprocketError = shiprocketData.message || "Failed to create order";
        }
      } catch (err: any) {
        console.error("[Shiprocket Integration Error]", err);
        shiprocketError = err instanceof Error ? err.message : "Shiprocket flow threw an error";
      }
    } else {
      console.log("[Shiprocket] Skipped order creation: missing shipping details or empty cart items list.");
    }

    return NextResponse.json({
      success: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      shiprocket: {
        created: shiprocketOrderCreated,
        error: shiprocketError,
        data: shiprocketData,
      }
    });
  } catch (err: unknown) {
    console.error("[Razorpay verify-payment error]", err);
    const message = err instanceof Error ? err.message : "Verification failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
