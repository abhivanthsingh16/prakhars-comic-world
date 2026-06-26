"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    // Razorpay integration will go here
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-black pt-32 text-white">

      <div className="mx-auto max-w-4xl px-6">

        <h1 className="text-5xl font-black">
          Checkout
        </h1>

        <p className="mt-4 text-slate-300">
          Complete your order below.
        </p>

        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-8">

          <div className="space-y-6">

            <input
              placeholder="Full Name"
              className="w-full rounded-xl bg-slate-900 p-4 outline-none"
            />

            <input
              placeholder="Email"
              className="w-full rounded-xl bg-slate-900 p-4 outline-none"
            />

            <input
              placeholder="Phone Number"
              className="w-full rounded-xl bg-slate-900 p-4 outline-none"
            />

            <textarea
              rows={4}
              placeholder="Shipping Address"
              className="w-full rounded-xl bg-slate-900 p-4 outline-none"
            />

          </div>

          <div className="mt-10 rounded-2xl bg-slate-900 p-6">

            <div className="flex justify-between">

              <span>The Alien Friend Lin</span>

              <span>₹599</span>

            </div>

          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-8 w-full rounded-full bg-yellow-400 py-4 text-xl font-bold text-black"
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>

        </div>

      </div>

    </main>
  );
}