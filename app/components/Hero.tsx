"use client";

import { motion } from "framer-motion";

import HeroContent from "./hero/HeroContent";
import HeroImage from "./hero/HeroImage";
import GalaxyBackground from "./hero/GalaxyBackground";
import Container from "./ui/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black">

      <GalaxyBackground />

      {/* Extra Background Glow */}
      <div className="absolute left-1/2 top-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[180px]" />

      <Container>

        <div className="relative z-10 grid min-h-screen items-center gap-20 pt-32 pb-24 lg:grid-cols-[1.05fr_0.95fr]">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroContent />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            className="flex justify-center lg:justify-end"
          >
            <HeroImage />
          </motion.div>

        </div>

      </Container>

      {/* Bottom Fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />

    </section>
  );
}