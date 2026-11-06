import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      return NextResponse.json({ error: "Payment gateway is not configured." }, { status: 500 });
    }

    const body = await request.json();
    const quantity = Number(body?.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return NextResponse.json({ error: "Invalid quantity." }, { status: 400 });
    }

    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({
      amount: 29900 * quantity,
      currency: "INR",
      receipt: `linleo_${Date.now()}`,
      notes: { product: "The Alien Friend Lin", quantity: String(quantity) },
    });

    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId });
  } catch {
    return NextResponse.json({ error: "Unable to create payment order. Please try again." }, { status: 500 });
  }
}