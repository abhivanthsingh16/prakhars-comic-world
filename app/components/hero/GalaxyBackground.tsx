"use client";

import { motion } from "framer-motion";

const stars = Array.from({ length: 180 });

export default function GalaxyBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Top Glow */}
      <div className="absolute left-[-250px] top-[-150px] h-[550px] w-[550px] rounded-full bg-cyan-500/15 blur-[160px]" />

      {/* Bottom Glow */}
      <div className="absolute right-[-250px] bottom-[-200px] h-[600px] w-[600px] rounded-full bg-violet-500/15 blur-[180px]" />

      {/* Center Glow */}
      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-[140px]" />

      {/* Stars */}
      {stars.map((_, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Shooting Star 1 */}
      <motion.div
        className="absolute h-[2px] w-32 bg-gradient-to-r from-white to-transparent"
        initial={{ x: -300, y: 100, opacity: 0 }}
        animate={{
          x: 1800,
          y: 500,
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 8,
          ease: "linear",
        }}
      />

      {/* Shooting Star 2 */}
      <motion.div
        className="absolute h-[2px] w-24 bg-gradient-to-r from-cyan-300 to-transparent"
        initial={{ x: -200, y: 300, opacity: 0 }}
        animate={{
          x: 1700,
          y: 700,
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatDelay: 12,
          ease: "linear",
        }}
      />

      {/* Planet */}
      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute right-24 top-24 h-24 w-24 rounded-full bg-gradient-to-br from-cyan-300 to-blue-700 opacity-30 blur-[1px]"
      />
    </div>
  );
}