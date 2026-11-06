import { NextResponse } from "next/server";

type OrderRecord = {
  action: "create" | "paid";
  orderId: string;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  quantity?: number;
  subtotal?: number;
  paymentMethod?: "COD" | "Razorpay";
  paymentStatus?: "Pending" | "Paid";
  razorpayOrderId?: string;
  paymentId?: string;
};

export async function saveOrder(record: OrderRecord) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) throw new Error("Order register is not configured yet.");
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...record, secret }),
    cache: "no-store",
  });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error("Could not save the order. Please try again.");
}
