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
    const pincode = String(body?.pincode || "");
    const shippingCharge = Number(body?.shippingCharge);
    const { name, email, phone, address } = body || {};
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10 ||
        ![name, email, phone, address].every((v) => typeof v === "string" && v.trim()) ||
        !/^[0-9+ -]{10,15}$/.test(phone) || !/^\\d{6}$/.test(pincode) || !Number.isFinite(shippingCharge) || shippingCharge <= 0) {
      return NextResponse.json({ error: "Please enter valid delivery details." }, { status: 400 });
    }
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({
      amount: Math.round((299 * quantity + shippingCharge) * 100), currency: "INR",
      receipt: `linleo_${Date.now()}`,
      notes: { product: "The Alien Friend Lin", quantity: String(quantity), shipping_charge: shippingCharge.toFixed(2), delivery_pincode: pincode },
    });
    await saveOrder({
      action: "create", orderId: order.id, razorpayOrderId: order.id,
      name: name.trim(), email: email.trim(), phone: phone.trim(), address: address.trim(),
      quantity, subtotal: 299 * quantity, shippingCharge, total: 299 * quantity + shippingCharge, pincode, paymentMethod: "Razorpay", paymentStatus: "Pending",
    });
    return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create payment order. Please try again." }, { status: 500 });
  }
}
