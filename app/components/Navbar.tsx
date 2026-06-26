"use client";

import Link from "next/link";
import { Rocket, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "Home", href: "/" },
  { name: "Comics", href: "/comics" },
  { name: "Author", href: "/author" },
  { name: "Store", href: "/store" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">

        <div className="mx-auto max-w-7xl px-6 pt-3">

          <motion.div
            animate={{
              y: scrolled ? -5 : 0,
              scale: scrolled ? 0.98 : 1,
            }}
            transition={{
              duration: 0.3,
            }}
            className={`flex h-14 items-center justify-between rounded-full border transition-all duration-300 ${
              scrolled
                ? "border-white/20 bg-slate-950/95 shadow-2xl backdrop-blur-xl"
                : "border-white/10 bg-slate-950/80 backdrop-blur-xl"
            }`}
          >

            {/* Logo */}

            <Link
              href="/"
              className="flex items-center gap-3 pl-7"
            >
              <motion.div
                whileHover={{
                  rotate: -15,
                  scale: 1.15,
                }}
              >
                <Rocket className="h-7 w-7 text-yellow-400" />
              </motion.div>

              <div className="leading-none">

                <h1 className="text-lg font-black text-yellow-400">
                  Prakhar's
                </h1>

                <p className="text-xs tracking-widest text-slate-300">
                  COMIC WORLD
                </p>

              </div>

            </Link>

            {/* Desktop */}

            <nav className="hidden items-center gap-10 pr-8 md:flex">

              {links.map((link) => (

                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-sm font-semibold text-slate-200 transition hover:text-yellow-400"
                >

                  {link.name}

                  <span className="absolute -bottom-2 left-1/2 h-[2px] w-0 -translate-x-1/2 bg-yellow-400 transition-all duration-300 hover:w-full" />

                </Link>

              ))}

            </nav>

            {/* Mobile */}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="pr-6 text-white md:hidden"
            >
              {mobileOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>

          </motion.div>

        </div>

      </header>

      <AnimatePresence>

        {mobileOpen && (

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl md:hidden"
          >

            <div className="flex h-full flex-col items-center justify-center gap-10">

              {links.map((link) => (

                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-3xl font-bold text-white hover:text-yellow-400"
                >
                  {link.name}
                </Link>

              ))}

            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}