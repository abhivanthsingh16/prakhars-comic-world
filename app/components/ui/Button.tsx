"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-yellow-400 text-black hover:bg-yellow-300"
      : "border border-white text-white hover:bg-white hover:text-black";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={`rounded-full px-8 py-4 font-bold transition ${styles}`}
    >
      {children}
    </motion.button>
  );
}