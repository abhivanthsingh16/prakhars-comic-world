"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "./ui/Container";
import Button from "./ui/Button";

export default function AuthorSection() {
  return (
    <section className="py-28">
      <Container>

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex justify-center"
          >

            <div className="absolute h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[100px]" />

            <motion.div
              whileHover={{
                scale: 1.03,
                rotate: -2,
              }}
              className="relative z-10"
            >

              <Image
                src="/images/Prakhar.jpeg"
                alt="Prakhar Singh Tomar"
                width={380}
                height={480}
                className="rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.5)]"
              />

            </motion.div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <span className="inline-block rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-bold uppercase tracking-widest text-yellow-400">
              Meet The Author
            </span>

            <h2 className="mt-6 text-6xl font-black">
              Prakhar
              <span className="block text-cyan-400">
                Singh Tomar
              </span>
            </h2>

            <p className="mt-8 text-xl leading-9 text-slate-300">
              Hi! I'm Prakhar, a 10-year-old comic creator who loves
              drawing, storytelling and creating exciting adventures.
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-400">
              The Alien Friend Lin is my first published comic and
              includes two exciting chapters packed with action,
              imagination and fun.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-5">

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
                <h3 className="text-4xl font-black text-yellow-400">
                  10
                </h3>
                <p className="mt-2 text-slate-300">
                  Years Old
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
                <h3 className="text-4xl font-black text-cyan-400">
                  1
                </h3>
                <p className="mt-2 text-slate-300">
                  Published Comic
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl">
                <h3 className="text-4xl">
                  🚀
                </h3>
                <p className="mt-2 text-slate-300">
                  Big Dreams
                </p>
              </div>

            </div>

            <div className="mt-10">

              <Button>
                Read My Story
              </Button>

            </div>

          </motion.div>

        </div>

      </Container>
    </section>
  );
}