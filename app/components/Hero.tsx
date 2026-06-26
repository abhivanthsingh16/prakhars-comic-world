"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >

          <p className="text-yellow-400 font-bold text-xl">
            Created by 10-Year-Old Author
          </p>

          <h1 className="mt-5 text-6xl lg:text-8xl font-black leading-tight">
            THE ALIEN
            <br />
            FRIEND LIN
          </h1>

          <p className="mt-8 text-xl text-gray-300 leading-9 max-w-xl">
            Join Lin on an unforgettable adventure filled with
            friendship, imagination and excitement.
          </p>

          <div className="flex gap-5 mt-10">

            <button className="rounded-full bg-yellow-400 px-8 py-4 text-black font-bold hover:scale-105 transition">
              Buy Now
            </button>

            <button className="rounded-full border border-white px-8 py-4 hover:bg-white hover:text-black transition">
              Read Sample
            </button>

          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ rotate: -2, scale: 1.05 }}
          className="flex justify-center"
        >

          <Image
            src="/images/Cover.PNG"
            alt="The Alien Friend Lin"
            width={420}
            height={600}
            className="rounded-3xl shadow-2xl"
            priority
          />

        </motion.div>

      </div>

    </section>
  );
}