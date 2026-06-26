"use client";

import Link from "next/link";
import { Rocket } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "Comics", href: "/comics" },
  { name: "Author", href: "/author" },
  { name: "Store", href: "/store" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="flex items-center gap-2 text-yellow-400 text-2xl font-extrabold"
        >
          <Rocket className="w-7 h-7" />
          <span>Prakhar's Comic World</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-white hover:text-yellow-400 transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </nav>

      </div>
    </header>
  );
}