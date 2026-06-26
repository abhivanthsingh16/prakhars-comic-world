import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST() {
  try {
    const order = await razorpay.orders.create({
      amount: 59900, // ₹599 in paise
      currency: "INR",
      receipt: `comic_${Date.now()}`,
    });

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to create order" },
      { status: 500 }
    );
  }
}