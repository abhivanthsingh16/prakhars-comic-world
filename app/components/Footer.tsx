"use client";

import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-slate-950 to-black">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 lg:grid-cols-[1.5fr_0.8fr_1fr_1.4fr]">

          {/* Brand */}

          <div>

            <h2 className="text-4xl font-black text-yellow-400">
              Prakhar's
            </h2>

            <h3 className="text-2xl font-bold text-white">
              Comic World
            </h3>

            <p className="mt-6 max-w-sm leading-8 text-slate-400">
              Inspiring young readers through imagination,
              adventure, creativity and unforgettable stories.
            </p>

          </div>

          {/* Explore */}

          <div>

            <h3 className="mb-6 text-xl font-bold text-white">
              Explore
            </h3>

            <div className="space-y-4">

              <Link href="/" className="block text-slate-400 hover:text-yellow-400 transition">
                Home
              </Link>

              <Link href="/comics" className="block text-slate-400 hover:text-yellow-400 transition">
                Comics
              </Link>

              <Link href="/author" className="block text-slate-400 hover:text-yellow-400 transition">
                Author
              </Link>

              <Link href="/store" className="block text-slate-400 hover:text-yellow-400 transition">
                Store
              </Link>

              <Link href="/contact" className="block text-slate-400 hover:text-yellow-400 transition">
                Contact
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-6 text-xl font-bold text-white">
              Contact
            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-3 text-slate-400">

                <Mail className="h-5 w-5 text-cyan-400" />

                <span>contact@prakharscomicworld.world</span>

              </div>

              <div className="flex items-center gap-3 text-slate-400">

                <span className="text-pink-500 text-xl">
                  📷
                </span>

                <span>@lin.and.leo</span>

              </div>

              <div className="flex items-center gap-3 text-slate-400">

                <MapPin className="h-5 w-5 text-yellow-400" />

                <span>India</span>

              </div>

            </div>

          </div>

          {/* Newsletter */}

          <div>

            <h3 className="mb-6 text-xl font-bold text-white">
              Join Our Newsletter
            </h3>

            <p className="mb-6 text-slate-400 leading-7">
              Get notified whenever a new comic,
              chapter or exciting adventure is released.
            </p>

            <div className="flex rounded-full border border-white/10 bg-slate-900 p-2">

              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-transparent px-4 text-white outline-none placeholder:text-slate-500"
              />

              <button className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 px-6 py-3 font-bold text-black transition hover:scale-105">
                Join
              </button>

            </div>

          </div>

        </div>

        <div className="mt-16 border-t border-white/10 pt-8">

          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 lg:flex-row">

            <p>
              © 2026 Prakhar's Comic World. All Rights Reserved.
            </p>

            <p>
              Made with ❤️ for young readers around the world.
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}