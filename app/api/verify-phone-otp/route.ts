import { NextRequest, NextResponse } from "next/server";
import { createPhoneVerificationProof } from "@/lib/phone-verification";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const authkey = process.env.MSG91_AUTHKEY;
    if (!authkey) return NextResponse.json({ error: "OTP verification is not configured on the server." }, { status: 503 });

    const body = await request.json();
    const accessToken = body?.accessToken;
    const phone = String(body?.phone || "").replace(/\D/g, "");
    if (typeof accessToken !== "string" || accessToken.length < 20 || !/^91\d{10}$/.test(phone)) {
      return NextResponse.json({ error: "Invalid OTP verification details." }, { status: 400 });
    }

    const response = await fetch("https://control.msg91.com/api/v5/widget/verifyAccessToken", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ authkey, "access-token": accessToken }),
      cache: "no-store",
    });
    const result = await response.json().catch(() => ({}));
    const status = String(result?.type || result?.status || "").toLowerCase();
    const verified = response.ok && (result?.success === true || status === "success" || result?.verified === true);
    if (!verified) {
      return NextResponse.json({ error: result?.message || "MSG91 could not confirm this OTP. Please try again." }, { status: 401 });
    }

    return NextResponse.json({ verified: true, phoneVerificationProof: createPhoneVerificationProof(phone) });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not verify this mobile number." }, { status: 500 });
  }
}
