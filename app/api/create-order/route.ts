import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";
import { saveOrder } from "@/lib/orders";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) return NextResponse.json({ error: "Payment gateway is not configured." }, { status: 500 });
    const body = await request.json();
    const quantity = Number(body?.quantity);
    const { name, email, phone, address } = body || {};
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10 ||
        ![name, email, phone, address].every((v) => typeof v === "string" && v.trim()) ||
        !/^[0-9+ -]{10,15}$/.test(phone)) {
      return NextResponse.json({ error: "Please enter valid delivery details." }, { status: 400 });
    }
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({
      amount: 29900 * quantity, currency: "INR",
      receipt: `linleo_${Date.now()}`,
      notes: { product: "The Alien Friend Lin", quantity: String(quantity) },
    });
    await saveOrder({
      action: "create", orderId: order.id, razorpayOrderId: order.id,
      name: name.trim(), email: email.trim(), phone: phone.trim(), address: address.trim(),
      quantity, subtotal: 299 * quantity, paymentMethod: "Razorpay", paymentStatus: "Pending",
    });
    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create payment order. Please try again." }, { status: 500 });
  }
}
