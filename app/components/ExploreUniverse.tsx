"use client";

import Link from "next/link";
import { BookOpen, User, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Read the Comic",
    description: "Start the adventure with The Alien Friend Lin.",
    icon: BookOpen,
    href: "/comics",
  },
  {
    title: "Meet Prakhar",
    description: "Discover the young author behind the comic.",
    icon: User,
    href: "/author",
  },
  {
    title: "Explore the Universe",
    description: "More adventures are coming soon!",
    icon: Rocket,
    href: "/store",
  },
];

export default function ExploreUniverse() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <h2 className="text-5xl font-black text-center mb-16">
        Explore The Universe
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.03 }}
              className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-md p-8 shadow-xl"
            >
              <Icon className="w-14 h-14 text-yellow-400 mb-6" />

              <h3 className="text-2xl font-bold">{card.title}</h3>

              <p className="text-gray-300 mt-4">
                {card.description}
              </p>

              <Link
                href={card.href}
                className="inline-block mt-8 text-yellow-400 font-bold"
              >
                Learn More →
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}