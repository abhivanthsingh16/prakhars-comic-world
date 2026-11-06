"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const gallery = [
  { src: "/images/Cover.webp", alt: "The Alien Friend Lin comic book cover", label: "Book cover" },
  { src: "/sample/Page1.webp", alt: "A preview page from The Alien Friend Lin", label: "Inside the comic" },
  { src: "/sample/Page2.webp", alt: "Another preview page from The Alien Friend Lin", label: "A first look" },
  { src: "/images/Chapter2.webp", alt: "Artwork from Lin and Leo: Journey to Mars", label: "Journey to Mars" },
];

export default function StorePage() {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-black pt-28 text-white">
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-2xl">
              <div className="relative mx-auto aspect-[4/5] max-h-[680px]">
                <Image src={gallery[activeImage].src} alt={gallery[activeImage].alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" />
              </div>
              <span className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/65 px-4 py-2 text-xs font-semibold text-white backdrop-blur">{gallery[activeImage].label}</span>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gallery.map((item, index) => (
                <button key={item.src} type="button" onClick={() => setActiveImage(index)} aria-label={`Show ${item.label}`} aria-pressed={activeImage === index} className={`relative aspect-[4/5] overflow-hidden rounded-xl border-2 bg-slate-900 p-1 transition ${activeImage === index ? "border-yellow-400" : "border-white/10 hover:border-white/40"}`}>
                  <Image src={item.src} alt="" fill sizes="25vw" className="object-contain p-1" />
                </button>
              ))}
            </div>
          </div>
          <div className="lg:sticky lg:top-28">
            <span className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">The first Lin and Leo adventure</span>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">The Alien Friend <span className="text-cyan-400">Lin</span></h1>
            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">Meet Lin, an alien child, and Leo, a human boy. Their friendship takes them on two exciting adventures filled with imagination, discovery and fun.</p>
            <div className="mt-7 flex flex-wrap items-end gap-3"><span className="text-4xl font-black text-yellow-400">₹299</span><span className="pb-1 text-sm text-slate-400">Inclusive of all taxes</span></div>
            <p className="mt-2 text-sm text-slate-400">Paperback · 74 full-colour pages</p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="font-semibold">Quantity</span>
                <div className="flex items-center rounded-full border border-white/20 bg-slate-950">
                  <button type="button" onClick={() => setQuantity(v => Math.max(1, v - 1))} disabled={quantity === 1} aria-label="Decrease quantity" className="h-11 w-11 text-xl disabled:opacity-30">−</button>
                  <span className="min-w-9 text-center font-bold tabular-nums">{quantity}</span>
                  <button type="button" onClick={() => setQuantity(v => Math.min(10, v + 1))} disabled={quantity === 10} aria-label="Increase quantity" className="h-11 w-11 text-xl disabled:opacity-30">+</button>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4"><span className="text-slate-300">Subtotal</span><span className="text-2xl font-bold">₹{299 * quantity}</span></div>
              <Link href={`/checkout?quantity=${quantity}`} className="mt-5 flex w-full items-center justify-center rounded-full bg-yellow-400 px-6 py-4 text-lg font-extrabold text-black transition hover:scale-[1.02] hover:bg-yellow-300">Buy Now</Link>
              <p className="mt-3 text-center text-xs text-slate-400">Shipping charges are calculated separately at checkout.</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4"><p className="font-bold text-cyan-300">2 adventures</p><p className="mt-1 text-slate-400">One exciting comic</p></div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4"><p className="font-bold text-cyan-300">Ages 6+</p><p className="mt-1 text-slate-400">Made for young readers</p></div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-white/10 bg-black/20 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-3xl font-black sm:text-4xl">Inside the book</h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6"><p className="text-sm font-bold uppercase tracking-widest text-yellow-400">Chapter 1</p><h3 className="mt-2 text-xl font-bold">The Alien Friend Lin</h3><p className="mt-3 leading-7 text-slate-300">Meet Lin and Leo as an unexpected friendship begins.</p></article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-6"><p className="text-sm font-bold uppercase tracking-widest text-cyan-400">Chapter 2</p><h3 className="mt-2 text-xl font-bold">Journey to Mars</h3><p className="mt-3 leading-7 text-slate-300">The adventure continues with a journey into space.</p></article>
          </div>
          <p className="mt-8 text-center text-sm text-slate-400">Want to see a few pages first? <Link href="/comics" className="font-semibold text-yellow-400 underline underline-offset-4">Read the preview</Link>.</p>
        </div>
      </section>
    </main>
  );
}
