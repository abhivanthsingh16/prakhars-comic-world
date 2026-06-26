"use client";

import { motion } from "framer-motion";
import Container from "./ui/Container";

export default function BuyComic() {
  return (
    <section className="py-28">
      <Container>

        <div className="rounded-[40px] border border-white/10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-12">

          <div className="grid gap-10 lg:grid-cols-2 items-center">

            <div>

              <p className="text-yellow-400 font-bold uppercase tracking-widest">
                Own Your Copy
              </p>

              <h2 className="mt-4 text-5xl font-black">
                Take Lin Home
              </h2>

              <p className="mt-6 text-lg text-slate-300 leading-8">
                Join thousands of young readers on Lin's first adventure.
                A beautifully printed full-color comic with action,
                friendship and imagination.
              </p>

              <div className="mt-8 flex gap-4">

                <div className="rounded-2xl bg-slate-950/70 p-5 border border-slate-700">
                  <p className="text-3xl font-black text-yellow-400">
                    74
                  </p>
                  <p className="text-slate-300">
                    Full Color Pages
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-950/70 p-5 border border-slate-700">
                  <p className="text-3xl font-black text-cyan-400">
                    Age 6+
                  </p>
                  <p className="text-slate-300">
                    Perfect For Kids
                  </p>
                </div>

              </div>

            </div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="rounded-3xl border border-yellow-400/20 bg-slate-950 p-10 text-center shadow-2xl"
            >

              <p className="text-slate-400">
                Paperback
              </p>

              <h3 className="mt-3 text-6xl font-black text-yellow-400">
                ₹599
              </h3>

              <p className="mt-4 text-slate-300">
                Premium Full Color Print
              </p>

              <button className="mt-10 w-full rounded-full bg-yellow-400 py-4 text-xl font-bold text-black hover:scale-105 transition">
                Buy Now
              </button>

            </motion.div>

          </div>

        </div>

      </Container>
    </section>
  );
}