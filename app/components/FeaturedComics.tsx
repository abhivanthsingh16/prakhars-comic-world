"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "./ui/Container";
import Button from "./ui/Button";

export default function FeaturedComic() {
  return (
    <section className="py-28 bg-slate-950/40">
      <Container>

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <span className="inline-block rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-cyan-300">
              Inside This Book
            </span>

            <h2 className="mt-6 text-6xl font-black leading-tight">
              Two Amazing
              <span className="block text-cyan-400">
                Adventures
              </span>
            </h2>

            <div className="mt-10 space-y-8">

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

                <p className="text-yellow-400 font-bold uppercase tracking-wider">
                  Chapter 1
                </p>

                <h3 className="mt-2 text-3xl font-black">
                  The Alien Friend Lin
                </h3>

                <p className="mt-3 text-slate-300">
                  Meet Lin for the very first time and begin an unforgettable adventure full of friendship, courage and imagination.
                </p>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">

                <p className="text-cyan-400 font-bold uppercase tracking-wider">
                  Chapter 2
                </p>

                <h3 className="mt-2 text-3xl font-black">
                  Journey To Mars
                </h3>

                <p className="mt-3 text-slate-300">
                  The adventure continues as Lin and Leo travel towards Mars and face exciting new discoveries.
                </p>

              </div>

            </div>

            <div className="mt-10 flex gap-5">

              <Button>
                Buy Paperback
              </Button>

              <Button variant="secondary">
                Read Preview
              </Button>

            </div>

          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >

            <div className="absolute h-[520px] w-[520px] rounded-full bg-cyan-500/15 blur-[120px]" />

            <motion.div
              whileHover={{ rotate: -5, scale: 1.04 }}
              className="absolute left-8 top-0 z-10"
            >
              <Image
                src="/sample/Page1.PNG"
                alt="Chapter 1"
                width={280}
                height={400}
                className="rounded-2xl border border-white/10 shadow-2xl"
              />
            </motion.div>

            <motion.div
              whileHover={{ rotate: 5, scale: 1.04 }}
              className="relative z-20 mt-20 ml-36"
            >
              <Image
                src="/images/Chapter2.PNG"
                alt="Chapter 2"
                width={280}
                height={400}
                className="rounded-2xl border border-white/10 shadow-2xl"
              />
            </motion.div>

          </motion.div>

        </div>

      </Container>
    </section>
  );
}