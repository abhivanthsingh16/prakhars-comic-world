"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FeaturedComic() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">

      <h2 className="text-center text-5xl font-black mb-16">
        Featured Comic
      </h2>

      <div className="grid lg:grid-cols-2 gap-16 items-center">

        <motion.div
          whileHover={{
            rotate: -3,
            scale: 1.05,
          }}
          className="flex justify-center"
        >

          <Image
            src="/images/cover.png"
            alt="The Alien Friend Lin"
            width={400}
            height={560}
            className="rounded-3xl shadow-2xl"
          />

        </motion.div>

        <div>

          <p className="text-yellow-400 font-bold">
            Book 1
          </p>

          <h3 className="text-5xl font-black mt-4">
            The Alien Friend Lin
          </h3>

          <p className="mt-8 text-xl text-gray-300 leading-9">

            Follow Lin on an unforgettable adventure filled
            with friendship, mystery, action and imagination.

          </p>

          <div className="mt-10 flex gap-5">

            <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition">

              Buy Paperback

            </button>

            <button className="border border-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition">

              Preview

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}