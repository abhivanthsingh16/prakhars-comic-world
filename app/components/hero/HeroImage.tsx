"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { book } from "@/app/constants/book";

export default function HeroImage() {
  return (
    <div className="relative flex items-center justify-center">

      {/* Main Glow */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute h-[650px] w-[650px] rounded-full bg-cyan-500/20 blur-[120px]"
      />

      {/* Secondary Glow */}
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[90px]"
      />

      {/* Rotating Ring */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-[620px] w-[620px] rounded-full border border-cyan-400/15"
      />

      {/* Comic Cover */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.08,
          rotate: -6,
          transition: {
            duration: 0.25,
          },
        }}
        className="relative z-20"
      >
        <Image
          src={book.cover}
          alt={book.title}
          width={470}
          height={680}
          priority
          className="rounded-3xl shadow-[0_40px_90px_rgba(0,0,0,0.8)]"
        />
      </motion.div>

      {/* Floating Badge */}
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute -top-6 right-0 z-30 rounded-full border border-yellow-400/40 bg-yellow-400/15 px-5 py-3 backdrop-blur-lg"
      >
        <p className="text-sm font-bold text-yellow-300">
          ⭐ 74 Full Color Pages
        </p>
      </motion.div>

      {/* Bottom Badge */}
      <motion.div
        animate={{
          y: [0, 8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="absolute -bottom-8 left-0 z-30 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 backdrop-blur-lg"
      >
        <p className="text-sm font-semibold text-cyan-300">
          🚀 Created by 10-Year-Old Author
        </p>
      </motion.div>

    </div>
  );
}