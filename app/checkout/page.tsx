"use client";

import { FormEvent, useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
    initSendOTP?: (configuration: Record<string, unknown>) => void;
    sendOtp?: (identifier: string, success?: (data: any) => void, failure?: (error: any) => void) => void;
    verifyOtp?: (otp: string, success?: (data: any) => void, failure?: (error: any) => void) => void;
  }
}

type Customer = { name: string; email: string; phone: string; address: string; city: string; state: string };
type ShippingQuote = {
  pincode: string;
  paymentMethod: "COD" | "Prepaid";
  serviceable: boolean;
  codAvailable: boolean;
  cheapest: { courierName: string; rate: number; etd: string } | null;
  couriers: { courierName: string; rate: number; etd: string }[];
  note: string;
};

export default function CheckoutPage() {
  const [quantity, setQuantity] = useState(1);
  const [customer, setCustomer] = useState<Customer>({ name: "", email: "", phone: "", address: "", city: "", state: "" });
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState("");
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [quote, setQuote] = useState<ShippingQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState<"Razorpay" | "COD">("Razorpay");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [phoneVerificationProof, setPhoneVerificationProof] = useState("");
  const [verifiedPhone, setVerifiedPhone] = useState("");
  const subtotal = 299 * quantity;
  const fullAddress = [customer.address, customer.city, customer.state, pincode].filter(Boolean).join(", ");

  useEffect(() => {
    const requestedQuantity = Number(new URLSearchParams(window.location.search).get("quantity") || "1");
    if (Number.isInteger(requestedQuantity)) setQuantity(Math.min(10, Math.max(1, requestedQuantity)));
    if (window.Razorpay) { setScriptReady(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setScriptReady(true);
    script.onerror = () => setMessage("Online payment could not load. You can still choose Cash on Delivery.");
    document.body.appendChild(script);
    return () => { script.onload = null; script.onerror = null; };
  }, []);

  useEffect(() => {
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeStatus("");
      setPincodeLoading(false);
      return;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      setPincodeLoading(true);
      setPincodeStatus("");
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        if (!response.ok) throw new Error("PIN code lookup failed.");
        const data = await response.json();
        const office = data?.[0]?.Status === "Success" ? data?.[0]?.PostOffice?.[0] : null;
        if (!office?.District || !office?.State) throw new Error("We couldn't find this PIN code. Please check it.");
        if (!cancelled) {
          setCustomer((current) => ({ ...current, city: office.District, state: office.State }));
          setPincodeStatus("City and state filled automatically.");
        }
      } catch (error) {
        if (!cancelled) {
          setCustomer((current) => ({ ...current, city: "", state: "" }));
          setPincodeStatus(error instanceof Error ? error.message : "Unable to verify this PIN code.");
        }
      } finally {
        if (!cancelled) setPincodeLoading(false);
      }
    }, 350);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [pincode]);

  useEffect(() => {
    if (!/^\d{6}$/.test(pincode)) { setQuote(null); return; }
    let cancelled = false;
    const timer = setTimeout(async () => {
      setQuoteLoading(true);
      setQuote(null);
      setMessage("");
      try {
        const response = await fetch("/api/shipping-rate", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pincode, quantity, paymentMethod: method === "COD" ? "COD" : "Prepaid" }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Could not calculate shipping.");
        if (!cancelled) {
          setQuote(result as ShippingQuote);
          if (!result.serviceable) setMessage("No courier service is available for this PIN code and parcel.");
          else if (method === "COD" && !result.codAvailable) setMessage("Courier service is available, but COD is not available for this PIN code.");
        }
      } catch (error) {
        if (!cancelled) setMessage(error instanceof Error ? error.message : "Shipping calculation failed.");
      } finally { if (!cancelled) setQuoteLoading(false); }
    }, 500);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [pincode, quantity, method]);

  const update = (field: keyof Customer, value: string) => {
    setCustomer((current) => ({ ...current, [field]: value }));
    if (field === "phone") {
      setPhoneVerified(false);
      setPhoneVerificationProof("");
      setVerifiedPhone("");
      setOtpSent(false);
      setOtp("");
    }
  };

  const loadMsg91Sdk = async () => {
    if (window.initSendOTP) return;
    await new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>('script[src="https://verify.msg91.com/otp-provider.js"]');
      if (existing) {
        existing.addEventListener("load", () => resolve(), { once: true });
        existing.addEventListener("error", () => reject(new Error("MSG91 OTP service could not load.")), { once: true });
        if (window.initSendOTP) resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://verify.msg91.com/otp-provider.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("MSG91 OTP service could not load."));
      document.body.appendChild(script);
    });
    if (!window.initSendOTP) throw new Error("MSG91 OTP service did not initialize.");
  };

  const startPhoneVerification = async () => {
    setMessage("");
    const digits = customer.phone.replace(/\\D/g, "");
    const mobile = digits.length === 10 ? `91${digits}` : digits;
    if (!/^91\\d{10}$/.test(mobile)) {
      setMessage("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    const widgetId = process.env.NEXT_PUBLIC_MSG91_WIDGET_ID;
    const tokenAuth = process.env.NEXT_PUBLIC_MSG91_TOKEN_AUTH;
    if (!widgetId || !tokenAuth) {
      setMessage("OTP service configuration is missing. Please contact the store.");
      return;
    }
    setOtpLoading(true);
    try {
      await loadMsg91Sdk();
      window.initSendOTP?.({
        widgetId,
        tokenAuth,
        identifier: mobile,
        exposeMethods: true,
        captchaRenderId: "msg91-captcha",
        success: () => undefined,
        failure: (error: unknown) => setMessage(typeof error === "string" ? error : "OTP verification failed. Please try again."),
      });
      if (!window.sendOtp) throw new Error("MSG91 send OTP method is unavailable.");
      window.sendOtp(mobile, () => {
        setOtpSent(true);
        setOtpLoading(false);
        setMessage("OTP sent. Enter the 4-digit code you received.");
      }, (error) => {
        setOtpLoading(false);
        setMessage(typeof error === "string" ? error : "Could not send OTP. Please try again.");
      });
    } catch (error) {
      setOtpLoading(false);
      setMessage(error instanceof Error ? error.message : "Could not start phone verification.");
    }
  };

  const verifyPhoneOtp = async () => {
    setMessage("");
    if (!/^\\d{4}$/.test(otp)) {
      setMessage("Enter the 4-digit OTP.");
      return;
    }
    if (!window.verifyOtp) {
      setMessage("OTP verification is not ready. Please request a new OTP.");
      return;
    }
    setOtpLoading(true);
    window.verifyOtp(otp, async (data) => {
      try {
        const accessToken = data?.["access-token"] || data?.accessToken || data?.token;
        if (typeof accessToken !== "string") throw new Error("MSG91 did not return a verification token.");
        const digits = customer.phone.replace(/\\D/g, "");
        const mobile = digits.length === 10 ? `91${digits}` : digits;
        const response = await fetch("/api/verify-phone-otp", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken, phone: mobile }),
        });
        const result = await response.json();
        if (!response.ok || !result.verified || !result.phoneVerificationProof) throw new Error(result.error || "Mobile number verification failed.");
        setPhoneVerificationProof(result.phoneVerificationProof);
        setVerifiedPhone(customer.phone);
        setPhoneVerified(true);
        setOtpSent(false);
        setOtp("");
        setMessage("Mobile number verified successfully.");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Could not verify this mobile number.");
      } finally {
        setOtpLoading(false);
      }
    }, (error) => {
      setOtpLoading(false);
      setMessage(typeof error === "string" ? error : "Incorrect or expired OTP. Please try again.");
    });
  };

  const handleCheckout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    if (!phoneVerified || verifiedPhone !== customer.phone || !phoneVerificationProof) { setMessage("Please verify your mobile number with OTP before placing the order."); return; }
    if (!customer.city || !customer.state) { setMessage("Please enter a valid PIN code so we can fill your city and state."); return; }
    if (!quote || quote.pincode !== pincode || quote.paymentMethod !== (method === "COD" ? "COD" : "Prepaid") || !quote.serviceable || (method === "COD" && !quote.codAvailable)) {
      setMessage("Please check shipping serviceability again for your PIN code and selected payment method.");
      return;
    }
    setLoading(true);
    try {
      if (method === "COD") {
        const response = await fetch("/api/cod-order", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...customer, address: fullAddress, quantity, pincode, shippingCharge: quote.cheapest?.rate || 0, phoneVerificationProof }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Could not place COD order.");
        window.location.href = `/payment-success?method=COD&order=${encodeURIComponent(result.orderId)}`;
        return;
      }
      if (!scriptReady || !window.Razorpay) throw new Error("Online payment is still loading. Please try again or select Cash on Delivery.");
      const response = await fetch("/api/create-order", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...customer, quantity, pincode, shippingCharge: quote.cheapest?.rate || 0, phoneVerificationProof }),
      });
      const order = await response.json();
      if (!response.ok) throw new Error(order.error || "Could not start payment.");
      const options = {
        key: order.keyId, amount: order.amount, currency: order.currency,
        name: "Lin and Leo", description: `The Alien Friend Lin x ${quantity}`,
        order_id: order.orderId,
        prefill: { name: customer.name, email: customer.email, contact: customer.phone },
        notes: { shipping_address: fullAddress, quantity: String(quantity) },
        theme: { color: "#facc15" },
        handler: async (payment: Record<string, string>) => {
          try {
            const verification = await fetch("/api/verify-payment", {
              method: "POST", headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payment),
            });
            const result = await verification.json();
            if (!verification.ok || !result.verified) throw new Error(result.error || "Payment could not be verified.");
            window.location.href = `/payment-success?method=Razorpay&order=${encodeURIComponent(order.orderId)}`;
          } catch (error) {
            setMessage(error instanceof Error ? error.message : "Payment verification failed. Please contact us before paying again.");
            setLoading(false);
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      };
      new window.Razorpay(options).open();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const shippingCharge = quote?.serviceable && quote.cheapest ? quote.cheapest.rate : 0;
  const canCheckout = Boolean(phoneVerified && verifiedPhone === customer.phone && phoneVerificationProof && quote?.serviceable && quote.pincode === pincode && quote.paymentMethod === (method === "COD" ? "COD" : "Prepaid") && (method !== "COD" || quote.codAvailable));

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-black pt-32 text-white">
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <h1 className="text-4xl font-black sm:text-5xl">Checkout</h1>
        <p className="mt-3 text-slate-300">Enter your delivery details to continue.</p>
        <form onSubmit={handleCheckout} className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8">
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl" aria-hidden="true">👤</span>
              <div>
                <h2 className="font-bold">Contact details</h2>
                <p className="text-xs text-slate-400">Your order updates will be sent here</p>
              </div>
            </div>
            <div className="space-y-4 p-5">
              <label className="block text-sm font-medium text-slate-300">Full name
                <input required autoComplete="name" value={customer.name} onChange={(e) => update("name", e.target.value)} placeholder="Enter your full name" aria-label="Full name" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 p-4 text-white outline-none transition focus:border-yellow-400" />
              </label>
              <label className="block text-sm font-medium text-slate-300">Mobile number
                <input required type="tel" autoComplete="tel" pattern="[0-9+ -]{10,15}" value={customer.phone} readOnly={phoneVerified} onChange={(e) => update("phone", e.target.value)} placeholder="Enter 10-digit mobile number" aria-label="Mobile number" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 p-4 text-white outline-none transition focus:border-yellow-400 read-only:opacity-70" />
              </label>
              <div className="mt-3">
                {phoneVerified && verifiedPhone === customer.phone ? (
                  <p className="text-sm font-semibold text-emerald-300">✓ Mobile number verified</p>
                ) : (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button type="button" disabled={otpLoading || !customer.phone.trim()} onClick={startPhoneVerification} className="rounded-xl border border-yellow-400/60 px-5 py-3 text-sm font-bold text-yellow-300 disabled:opacity-50">
                      {otpLoading && !otpSent ? "Sending OTP..." : otpSent ? "Resend OTP" : "Verify mobile with OTP"}
                    </button>
                    {otpSent && (
                      <div className="flex flex-1 gap-2">
                        <input inputMode="numeric" maxLength={4} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\\D/g, "").slice(0, 4))} placeholder="4-digit OTP" aria-label="4-digit OTP" className="min-w-0 flex-1 rounded-xl border border-white/10 bg-slate-950/80 p-3 text-white outline-none focus:border-yellow-400" />
                        <button type="button" disabled={otpLoading || otp.length !== 4} onClick={verifyPhoneOtp} className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black disabled:opacity-50">{otpLoading ? "Verifying..." : "Confirm OTP"}</button>
                      </div>
                    )}
                  </div>
                )}
                <div id="msg91-captcha" className="mt-2" />
              </div>
              <label className="block text-sm font-medium text-slate-300">Email address
                <input required type="email" autoComplete="email" value={customer.email} onChange={(e) => update("email", e.target.value)} placeholder="Enter email address" aria-label="Email address" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 p-4 text-white outline-none transition focus:border-yellow-400" />
              </label>
            </div>
          </section>
          <section className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xl" aria-hidden="true">📍</span>
              <div>
                <h2 className="font-bold">Delivery address</h2>
                <p className="text-xs text-slate-400">Where should we deliver your comic?</p>
              </div>
            </div>
            <div className="space-y-4 p-5">
              <label className="block text-sm font-medium text-slate-300">House / flat, street, area and landmark
                <textarea required rows={2} autoComplete="street-address" value={customer.address} onChange={(e) => update("address", e.target.value)} placeholder="Enter house number, street, area and landmark" aria-label="House, street and area" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 p-4 text-white outline-none transition focus:border-yellow-400" />
              </label>
              <label className="block text-sm font-medium text-slate-300">PIN code
                <input required inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{6}" maxLength={6} value={pincode} onChange={(e) => { const value = e.target.value.replace(/\D/g, "").slice(0, 6); setPincode(value); setQuote(null); setCustomer((current) => ({ ...current, city: "", state: "" })); }} placeholder="Enter 6-digit PIN code" aria-label="6-digit PIN code" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/80 p-4 text-white outline-none transition focus:border-yellow-400" />
                {pincodeLoading && <span className="mt-2 block text-xs text-slate-300">Finding city and state...</span>}
                {!pincodeLoading && pincodeStatus && <span role="status" className={`mt-2 block text-xs ${pincodeStatus.includes("filled") ? "text-emerald-300" : "text-rose-300"}`}>{pincodeStatus}</span>}
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-300">City
                  <input required readOnly autoComplete="address-level2" value={customer.city} placeholder="Auto-filled from PIN code" aria-label="City" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/50 p-4 text-white/80 outline-none" />
                </label>
                <label className="block text-sm font-medium text-slate-300">State
                  <input required readOnly autoComplete="address-level1" value={customer.state} placeholder="Auto-filled from PIN code" aria-label="State" className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/50 p-4 text-white/80 outline-none" />
                </label>
              </div>
            </div>
          </section>
          <div className="mt-6">
            <p className="mb-3 font-semibold">Choose payment method</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => { setMethod("Razorpay"); setQuote(null); }} className={`rounded-xl border p-4 text-left ${method === "Razorpay" ? "border-yellow-400 bg-yellow-400/10" : "border-white/15 bg-slate-900"}`}>
                <span className="block font-bold">Pay Online</span><span className="mt-1 block text-sm text-slate-300">UPI, cards and net banking</span>
              </button>
              <button type="button" onClick={() => { setMethod("COD"); setQuote(null); }} className={`rounded-xl border p-4 text-left ${method === "COD" ? "border-yellow-400 bg-yellow-400/10" : "border-white/15 bg-slate-900"}`}>
                <span className="block font-bold">Cash on Delivery</span><span className="mt-1 block text-sm text-slate-300">Pay when your book arrives</span>
              </button>
            </div>
          </div>
          <div className="mt-4 min-h-6 text-sm" aria-live="polite">
            {quoteLoading ? (
              <p className="text-slate-300">Calculating shipping...</p>
            ) : quote?.serviceable && quote.cheapest?.etd ? (
              <p className="text-emerald-200">Estimated delivery: {quote.cheapest.etd}</p>
            ) : message ? (
              <p role="alert" className="flex items-center gap-2 text-rose-300"><span aria-hidden="true" className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-rose-300 font-bold">!</span>{message}</p>
            ) : !/^\d{6}$/.test(pincode) ? (
              <p className="text-slate-300">Enter your 6-digit PIN code to calculate shipping.</p>
            ) : null}
          </div>

          <div className="mt-7 rounded-2xl bg-slate-900 p-5">
            <div className="flex justify-between gap-4"><span>The Alien Friend Lin x {quantity}</span><span>₹{subtotal}</span></div>
            <div className="mt-2 flex justify-between gap-4 text-sm text-slate-300"><span>Shipping charge</span><span>{canCheckout ? `₹${shippingCharge.toFixed(2)}` : "—"}</span></div>
            <div className="mt-3 flex justify-between border-t border-white/10 pt-3 text-lg font-bold"><span>Total to pay</span><span>₹{(subtotal + (canCheckout ? shippingCharge : 0)).toFixed(2)}</span></div>

          </div>

          <button type="submit" disabled={loading || !canCheckout} className="mt-7 w-full rounded-full bg-yellow-400 py-4 text-lg font-bold text-black disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Processing..." : canCheckout ? `Pay ₹${(subtotal + shippingCharge).toFixed(2)}${method === "COD" ? " on Delivery" : " Online"}` : "Enter PIN code to calculate shipping"}
          </button>
          <p className="mt-3 text-center text-xs text-slate-400">Lin and Leo · Secure checkout</p>
        </form>
      </div>
    </main>
  );
}
