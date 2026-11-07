import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { saveOrder } from "@/lib/orders";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
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
    const orderId = `LL-${randomUUID().slice(0, 8).toUpperCase()}`;
    await saveOrder({
      action: "create", orderId, name: name.trim(), email: email.trim(), phone: phone.trim(),
      address: address.trim(), quantity, subtotal: 299 * quantity, shippingCharge, total: 299 * quantity + shippingCharge, pincode,
      paymentMethod: "COD", paymentStatus: "Pending",
    });
    return NextResponse.json({ ok: true, orderId });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to place COD order." }, { status: 500 });
  }
}
