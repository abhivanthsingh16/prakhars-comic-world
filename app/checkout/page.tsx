"use client";

import { FormEvent, useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

type Customer = { name: string; email: string; phone: string; address: string };

export default function CheckoutPage() {
  const [quantity, setQuantity] = useState(1);
  const [customer, setCustomer] = useState<Customer>({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState<"Razorpay" | "COD">("Razorpay");
  const subtotal = 299 * quantity;

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

  const update = (field: keyof Customer, value: string) => setCustomer((current) => ({ ...current, [field]: value }));

  const handleCheckout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);
    try {
      if (method === "COD") {
        const response = await fetch("/api/cod-order", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...customer, quantity }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Could not place COD order.");
        window.location.href = `/payment-success?method=COD&order=${encodeURIComponent(result.orderId)}`;
        return;
      }
      if (!scriptReady || !window.Razorpay) throw new Error("Online payment is still loading. Please try again or select Cash on Delivery.");
      const response = await fetch("/api/create-order", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...customer, quantity }),
      });
      const order = await response.json();
      if (!response.ok) throw new Error(order.error || "Could not start payment.");
      const options = {
        key: order.keyId, amount: order.amount, currency: order.currency,
        name: "Lin and Leo", description: `The Alien Friend Lin x ${quantity}`,
        order_id: order.orderId,
        prefill: { name: customer.name, email: customer.email, contact: customer.phone },
        notes: { shipping_address: customer.address, quantity: String(quantity) },
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-black pt-32 text-white">
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <h1 className="text-4xl font-black sm:text-5xl">Checkout</h1>
        <p className="mt-3 text-slate-300">Enter your delivery details to continue.</p>
        <form onSubmit={handleCheckout} className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-8">
          <div className="grid gap-4">
            <input required autoComplete="name" value={customer.name} onChange={(e) => update("name", e.target.value)} placeholder="Full Name" className="w-full rounded-xl bg-slate-900 p-4 outline-none focus:ring-2 focus:ring-yellow-400" />
            <input required type="email" autoComplete="email" value={customer.email} onChange={(e) => update("email", e.target.value)} placeholder="Email Address" className="w-full rounded-xl bg-slate-900 p-4 outline-none focus:ring-2 focus:ring-yellow-400" />
            <input required type="tel" autoComplete="tel" pattern="[0-9+ -]{10,15}" value={customer.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Phone Number" className="w-full rounded-xl bg-slate-900 p-4 outline-none focus:ring-2 focus:ring-yellow-400" />
            <textarea required rows={4} autoComplete="street-address" value={customer.address} onChange={(e) => update("address", e.target.value)} placeholder="Full Shipping Address with PIN Code" className="w-full rounded-xl bg-slate-900 p-4 outline-none focus:ring-2 focus:ring-yellow-400" />
          </div>
          <div className="mt-6">
            <p className="mb-3 font-semibold">Choose payment method</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button type="button" onClick={() => setMethod("Razorpay")} className={`rounded-xl border p-4 text-left ${method === "Razorpay" ? "border-yellow-400 bg-yellow-400/10" : "border-white/15 bg-slate-900"}`}>
                <span className="block font-bold">Pay Online</span><span className="mt-1 block text-sm text-slate-300">UPI, cards and net banking</span>
              </button>
              <button type="button" onClick={() => setMethod("COD")} className={`rounded-xl border p-4 text-left ${method === "COD" ? "border-yellow-400 bg-yellow-400/10" : "border-white/15 bg-slate-900"}`}>
                <span className="block font-bold">Cash on Delivery</span><span className="mt-1 block text-sm text-slate-300">Pay when your book arrives</span>
              </button>
            </div>
          </div>
          <div className="mt-7 rounded-2xl bg-slate-900 p-5">
            <div className="flex justify-between gap-4"><span>The Alien Friend Lin x {quantity}</span><span>₹{subtotal}</span></div>
            <div className="mt-3 flex justify-between border-t border-white/10 pt-3 text-lg font-bold"><span>Book subtotal</span><span>₹{subtotal}</span></div>
            <p className="mt-3 text-xs leading-5 text-slate-400">Shipping is not included. The final delivery charge must be confirmed before accepting live orders. COD availability may depend on courier serviceability.</p>
          </div>
          {message && <p role="alert" className="mt-5 rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">{message}</p>}
          <button type="submit" disabled={loading} className="mt-7 w-full rounded-full bg-yellow-400 py-4 text-lg font-bold text-black disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Processing..." : method === "COD" ? `Place COD Order · ₹${subtotal} + shipping` : !scriptReady ? "Loading payment..." : `Pay ₹${subtotal} + shipping`}
          </button>
          <p className="mt-3 text-center text-xs text-slate-400">Lin and Leo · Secure checkout</p>
        </form>
      </div>
    </main>
  );
}
