import Image from "next/image";
import Link from "next/link";

export default function ComicsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-black text-white pt-32">

      <section className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-block rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-bold uppercase tracking-widest text-cyan-300">
            Comic Collection
          </span>

          <h1 className="mt-6 text-6xl font-black">
            The Alien Friend Lin
          </h1>

          <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto leading-9">
            A full-color comic book containing two exciting adventures
            created by 10-year-old author Prakhar Singh Tomar.
          </p>

        </div>

        <div className="mt-24 grid lg:grid-cols-2 gap-20 items-center">

          <div className="flex justify-center">

            <Image
              src="/images/Cover.PNG"
              alt="Comic Cover"
              width={450}
              height={640}
              className="rounded-3xl shadow-[0_40px_90px_rgba(0,0,0,0.6)]"
            />

          </div>

          <div>

            <h2 className="text-4xl font-black">
              What's Inside
            </h2>

            <div className="mt-10 space-y-6">

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

                <h3 className="text-2xl font-bold text-yellow-400">
                  Chapter 1
                </h3>

                <p className="mt-3 text-slate-300 leading-8">
                  The Alien Friend Lin begins with an unexpected meeting
                  that changes everything.
                </p>

              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">

                <h3 className="text-2xl font-bold text-cyan-400">
                  Chapter 2
                </h3>

                <p className="mt-3 text-slate-300 leading-8">
                  Journey To Mars takes the adventure to an entirely new world.
                </p>

              </div>

            </div>

            <div className="mt-10 grid grid-cols-3 gap-5">

              <div className="rounded-2xl bg-white/5 p-5 text-center">

                <h3 className="text-4xl font-black text-yellow-400">
                  74
                </h3>

                <p className="mt-2 text-slate-300">
                  Pages
                </p>

              </div>

              <div className="rounded-2xl bg-white/5 p-5 text-center">

                <h3 className="text-4xl font-black text-cyan-400">
                  2
                </h3>

                <p className="mt-2 text-slate-300">
                  Chapters
                </p>

              </div>

              <div className="rounded-2xl bg-white/5 p-5 text-center">

                <h3 className="text-4xl">
                  🌍
                </h3>

                <p className="mt-2 text-slate-300">
                  Worldwide
                </p>

              </div>

            </div>

            <div className="mt-12 flex gap-5">

              <Link
                href="/store"
                className="rounded-full bg-yellow-400 px-8 py-4 font-bold text-black hover:scale-105 transition"
              >
                Buy Paperback
              </Link>

              <Link
                href="/"
                className="rounded-full border border-white px-8 py-4 hover:bg-white hover:text-black transition"
              >
                Read Preview
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}