import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    // Guard: ensure env vars are present before using Razorpay
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      console.error("[create-order] Missing Razorpay env vars");
      return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
    }

    // Initialize inside handler so env vars are available at runtime (not build time)
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

    const body = await req.json();
    const { amount, currency = "INR", receipt } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise (Razorpay expects smallest unit)
      currency,
      receipt: receipt ?? `rcpt_${Date.now()}`,
      notes: {
        source: "Millennium Tea Website",
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err: unknown) {
    console.error("[Razorpay create-order error]", err);
    const message = err instanceof Error ? err.message : "Failed to create order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
