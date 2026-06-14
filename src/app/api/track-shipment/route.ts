import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shipmentId = searchParams.get("shipment_id");

    if (!shipmentId) {
      return NextResponse.json({ error: "Missing shipment_id" }, { status: 400 });
    }

    console.log(`[Shiprocket Tracking] Fetching tracking for shipment ID: ${shipmentId}`);

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
      throw new Error(`Shiprocket auth failed: ${errText}`);
    }

    const { token } = await authRes.json();

    // 2. Fetch tracking details by shipment_id
    const trackRes = await fetch(`https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipmentId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!trackRes.ok) {
      const errText = await trackRes.text();
      throw new Error(`Shiprocket tracking call failed: ${errText}`);
    }

    const data = await trackRes.json();
    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("[Shiprocket Tracking Error]", err);
    return NextResponse.json({ 
      success: false, 
      error: err instanceof Error ? err.message : "Shiprocket tracking failed" 
    }, { status: 500 });
  }
}
