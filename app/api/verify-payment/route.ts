import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Payment verification is not configured." }, { status: 500 });
    }

    const body = await request.json();
    const orderId = body?.razorpay_order_id;
    const paymentId = body?.razorpay_payment_id;
    const signature = body?.razorpay_signature;
    if (typeof orderId !== "string" || typeof paymentId !== "string" || typeof signature !== "string") {
      return NextResponse.json({ verified: false, error: "Missing payment details." }, { status: 400 });
    }

    const expected = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
    const expectedBuffer = Buffer.from(expected, "hex");
    const receivedBuffer = Buffer.from(signature, "hex");
    const verified = expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);
    if (!verified) {
      return NextResponse.json({ verified: false, error: "Payment signature is invalid." }, { status: 400 });
    }
    return NextResponse.json({ verified: true });
  } catch {
    return NextResponse.json({ verified: false, error: "Unable to verify payment." }, { status: 500 });
  }
}