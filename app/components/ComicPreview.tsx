"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./ui/Container";

const pages = [
  "/sample/Page1.PNG",
  "/sample/Page2.PNG",
  "/sample/Page3.PNG",
  "/sample/Page4.PNG",
  "/sample/Page5.PNG",
  "/sample/Page6.PNG",
];

export default function ComicPreview() {
  const [page, setPage] = useState(0);

  const nextPage = () => {
    if (page < pages.length - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <section className="py-28">
      <Container>

        <div className="text-center">

          <p className="text-yellow-400 font-bold uppercase tracking-widest">
            Read Before You Buy
          </p>

          <h2 className="mt-3 text-5xl font-black">
            Preview The Comic
          </h2>

          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            Read the first few pages of <b>The Alien Friend Lin</b> before
            purchasing the full comic.
          </p>

        </div>

        <div className="mt-16 flex justify-center">

          <div className="relative w-full max-w-md">

            <AnimatePresence mode="wait">

              <motion.div
                key={page}
                initial={{ opacity: 0, rotateY: 25 }}
                animate={{ opacity: 1, rotateY: 0 }}
                exit={{ opacity: 0, rotateY: -25 }}
                transition={{ duration: 0.35 }}
              >
                <Image
                  src={pages[page]}
                  alt={`Comic Page ${page + 1}`}
                  width={700}
                  height={1000}
                  className="rounded-3xl shadow-2xl border border-slate-700"
                />
              </motion.div>

            </AnimatePresence>

          </div>

        </div>

        <div className="mt-10 flex items-center justify-center gap-5">

          <button
            onClick={prevPage}
            disabled={page === 0}
            className="rounded-full border border-slate-600 px-6 py-3 transition hover:bg-slate-800 disabled:opacity-40"
          >
            ← Previous
          </button>

          <div className="text-lg font-bold">
            {page + 1} / {pages.length}
          </div>

          <button
            onClick={nextPage}
            disabled={page === pages.length - 1}
            className="rounded-full bg-yellow-400 px-6 py-3 font-bold text-black transition hover:scale-105 disabled:opacity-40"
          >
            Next →
          </button>

        </div>

      </Container>
    </section>
  );
}