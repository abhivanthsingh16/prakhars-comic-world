import Image from "next/image";
import Link from "next/link";

export default function StorePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-black text-white pt-32">

      <section className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}

          <div className="flex justify-center">

            <Image
              src="/images/Cover.PNG"
              alt="The Alien Friend Lin"
              width={450}
              height={630}
              className="rounded-3xl shadow-[0_40px_90px_rgba(0,0,0,0.6)]"
            />

          </div>

          {/* Right */}

          <div>

            <span className="inline-block rounded-full border border-yellow-400/20 bg-yellow-400/10 px-5 py-2 text-sm font-bold uppercase tracking-widest text-yellow-400">
              Paperback Edition
            </span>

            <h1 className="mt-6 text-6xl font-black">
              The Alien
              <span className="block text-cyan-400">
                Friend Lin
              </span>
            </h1>

            <p className="mt-8 text-xl leading-9 text-slate-300">
              A premium full-color comic book containing two exciting adventures,
              beautifully printed for young readers.
            </p>

            <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">

              <div className="flex items-center justify-between">

                <span className="text-slate-300">
                  Paperback
                </span>

                <span className="text-5xl font-black text-yellow-400">
                  ₹599
                </span>

              </div>

            </div>

            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-3">
                <span>✅</span>
                <span>74 Full Color Pages</span>
              </div>

              <div className="flex items-center gap-3">
                <span>✅</span>
                <span>2 Exciting Chapters</span>
              </div>

              <div className="flex items-center gap-3">
                <span>✅</span>
                <span>Perfect for Ages 6+</span>
              </div>

              <div className="flex items-center gap-3">
                <span>✅</span>
                <span>Premium Paperback Print</span>
              </div>

              <div className="flex items-center gap-3">
                <span>🚚</span>
                <span>Worldwide Shipping</span>
              </div>

            </div>

            <div className="mt-12 flex gap-5">

              <Link
                href="/checkout"
                className="rounded-full bg-yellow-400 px-10 py-5 text-lg font-bold text-black transition hover:scale-105"
              >
                Buy Now
              </Link>

              <Link
                href="/comics"
                className="rounded-full border border-white px-10 py-5 text-lg hover:bg-white hover:text-black transition"
              >
                Read Preview
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* FAQ */}

      <section className="max-w-5xl mx-auto px-6 py-28">

        <h2 className="text-center text-5xl font-black">
          Frequently Asked Questions
        </h2>

        <div className="mt-16 space-y-6">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-bold">
              Is this a physical book?
            </h3>

            <p className="mt-4 text-slate-300 leading-8">
              Yes. This is a premium paperback comic printed in full color.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-bold">
              What age is it for?
            </h3>

            <p className="mt-4 text-slate-300 leading-8">
              Recommended for children aged 6 years and above.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <h3 className="text-2xl font-bold">
              How many chapters are included?
            </h3>

            <p className="mt-4 text-slate-300 leading-8">
              The comic contains two exciting adventures in one book.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}