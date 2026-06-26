"use client";

import { motion } from "framer-motion";

const stars = Array.from({ length: 120 });

export default function AnimatedStars() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {stars.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"

          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}

          animate={{
            opacity: [0.2, 1, 0.2],
          }}

          transition={{
            repeat: Infinity,
            duration: Math.random() * 4 + 2,
            delay: Math.random() * 5,
          }}
        />
      ))}

    </div>
  );
}