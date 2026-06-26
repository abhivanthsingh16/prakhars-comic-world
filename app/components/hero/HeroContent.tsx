"use client";

import { motion } from "framer-motion";
import { BookOpen, Rocket, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import { book } from "@/app/constants/book";

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-2xl"
    >
      {/* Badge */}

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 backdrop-blur-xl"
      >
        <Rocket className="h-4 w-4 text-cyan-300" />

        <span className="text-sm font-semibold text-cyan-200">
          Created by 10-Year-Old Author
        </span>
      </motion.div>

      {/* Heading */}

      <h1 className="mt-8 leading-[0.9] font-black uppercase tracking-tight">

        <span className="block text-6xl text-white md:text-7xl xl:text-8xl">
          THE
        </span>

        <span className="block bg-gradient-to-r from-yellow-300 via-yellow-500 to-orange-400 bg-clip-text text-6xl text-transparent md:text-7xl xl:text-8xl">
          ALIEN
        </span>

        <span className="block bg-gradient-to-r from-cyan-300 via-cyan-500 to-blue-500 bg-clip-text text-6xl text-transparent md:text-7xl xl:text-8xl">
          FRIEND LIN
        </span>

      </h1>

      {/* Subtitle */}

      <p className="mt-8 max-w-xl text-xl leading-9 text-slate-300">
        Join Lin on an unforgettable adventure through space filled with
        friendship, courage and imagination.

      </p>

      {/* Buttons */}

      <div className="mt-10 flex flex-wrap gap-5">

        <Button>
          Start the Adventure
        </Button>

        <Button variant="secondary">
          Read Sample
        </Button>

      </div>

      {/* Features */}

      <div className="mt-14 grid gap-5 md:grid-cols-3">

        <motion.div
          whileHover={{ y: -6 }}
          className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-xl"
        >
          <Sparkles className="mb-4 h-7 w-7 text-yellow-400" />

          <h3 className="text-4xl font-black text-yellow-400">
            74
          </h3>

          <p className="mt-2 text-slate-300">
            Full Color Pages
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -6 }}
          className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-xl"
        >
          <BookOpen className="mb-4 h-7 w-7 text-cyan-400" />

          <h3 className="text-4xl font-black text-cyan-400">
            6+
          </h3>

          <p className="mt-2 text-slate-300">
            Recommended Age
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -6 }}
          className="rounded-3xl border border-cyan-500/20 bg-white/5 p-6 backdrop-blur-xl"
        >
          <div className="mb-4 text-2xl">
            🌍
          </div>

          <h3 className="text-4xl font-black text-green-400">
            Global
          </h3>

          <p className="mt-2 text-slate-300">
            Shipping Ready
          </p>
        </motion.div>

      </div>

    </motion.div>
  );
}