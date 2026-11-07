import { NextRequest, NextResponse } from "next/server";
import { shiprocketGet } from "@/lib/shiprocket";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const pincode = String(body?.pincode || "").trim();
    const quantity = Number(body?.quantity || 1);
    const paymentMethod = body?.paymentMethod === "COD" ? "COD" : "Prepaid";
    if (!/^\d{6}$/.test(pincode)) {
      return NextResponse.json({ error: "Enter a valid 6-digit delivery PIN code." }, { status: 400 });
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return NextResponse.json({ error: "Invalid book quantity." }, { status: 400 });
    }

    const params = new URLSearchParams({
      pickup_postcode: "263139",
      delivery_postcode: pincode,
      cod: paymentMethod === "COD" ? "1" : "0",
      weight: (0.2 * quantity).toFixed(2),
      length: "25",
      breadth: "15",
      height: String(Math.max(1, quantity)),
      declared_value: String(299 * quantity),
    });
    const data = await shiprocketGet(`/courier/serviceability/?${params.toString()}`);
    const couriers = Array.isArray(data?.data?.available_courier_companies)
      ? data.data.available_courier_companies
      : [];
    const options = couriers.map((c: Record<string, unknown>) => ({
      courierName: String(c.courier_name || "Courier"),
      rate: Number(c.rate ?? c.freight_charge ?? 0),
      etd: String(c.etd || c.estimated_delivery_days || ""),
      codAvailable: Boolean(c.cod),
      courierId: Number(c.courier_company_id || 0),
    })).filter((c: { rate: number }) => Number.isFinite(c.rate) && c.rate > 0)
      .sort((a: { rate: number }, b: { rate: number }) => a.rate - b.rate);

    return NextResponse.json({
      ok: true,
      pincode,
      paymentMethod,
      serviceable: options.length > 0,
      codAvailable: paymentMethod === "COD" && options.some((c: { codAvailable: boolean }) => c.codAvailable),
      cheapest: options[0] || null,
      couriers: options.slice(0, 5),
      note: "Rates are live estimates and may change when the parcel is booked.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not check Shiprocket serviceability." },
      { status: 502 },
    );
  }
}
