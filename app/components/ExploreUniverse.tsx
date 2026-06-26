"use client";

import Link from "next/link";
import { BookOpen, User, Rocket } from "lucide-react";
import { motion } from "framer-motion";

import Container from "./ui/Container";
import GlassCard from "./ui/GlassCard";
import SectionHeading from "./ui/SectionHeading";

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
    <section className="py-24">
      <Container>

        <SectionHeading
          subtitle="DISCOVER"
          title="Explore the Universe"
        />

        <div className="grid gap-8 md:grid-cols-3">

          {cards.map((card, index) => {

            const Icon = card.icon;

            return (

              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.25,
                }}
              >

                <GlassCard>

                  <Icon className="mb-6 h-14 w-14 text-yellow-400" />

                  <h3 className="text-2xl font-bold">
                    {card.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-300">
                    {card.description}
                  </p>

                  <Link
                    href={card.href}
                    className="mt-8 inline-block font-bold text-yellow-400 hover:text-yellow-300"
                  >
                    Learn More →
                  </Link>

                </GlassCard>

              </motion.div>

            );

          })}

        </div>

      </Container>
    </section>
  );
}