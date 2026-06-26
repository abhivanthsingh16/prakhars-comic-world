import Image from "next/image";
import Link from "next/link";

export default function AuthorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-black text-white pt-32">

      <section className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <div className="flex justify-center">

            <Image
              src="/images/Prakhar.jpeg"
              alt="Prakhar Singh Tomar"
              width={420}
              height={520}
              className="rounded-3xl shadow-[0_40px_90px_rgba(0,0,0,0.6)]"
            />

          </div>

          {/* RIGHT */}

          <div>

            <span className="inline-block rounded-full bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 text-yellow-400 font-bold uppercase tracking-widest">
              Meet The Author
            </span>

            <h1 className="mt-6 text-6xl font-black">
              Prakhar
              <span className="block text-cyan-400">
                Singh Tomar
              </span>
            </h1>

            <p className="mt-8 text-xl text-slate-300 leading-9">
              Hi! I'm Prakhar, a 10-year-old comic creator from India.
              I love drawing, storytelling and creating exciting adventures
              for children around the world.
            </p>

            <p className="mt-6 text-lg text-slate-400 leading-8">
              The Alien Friend Lin is my very first comic book.
              It contains two exciting chapters full of action,
              friendship and imagination.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-5">

              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 text-center">
                <h3 className="text-4xl font-black text-yellow-400">
                  10
                </h3>
                <p className="mt-2 text-slate-300">
                  Years Old
                </p>
              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 text-center">
                <h3 className="text-4xl font-black text-cyan-400">
                  1
                </h3>
                <p className="mt-2 text-slate-300">
                  Published Comic
                </p>
              </div>

              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 text-center">
                <h3 className="text-4xl">
                  🚀
                </h3>
                <p className="mt-2 text-slate-300">
                  Big Dreams
                </p>
              </div>

            </div>

            <div className="mt-12">

              <Link
                href="/store"
                className="inline-block rounded-full bg-yellow-400 px-8 py-4 font-bold text-black hover:scale-105 transition"
              >
                Buy My Comic
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Journey */}

      <section className="max-w-5xl mx-auto px-6 py-28">

        <h2 className="text-center text-5xl font-black">
          My Journey
        </h2>

        <div className="mt-20 space-y-8">

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <h3 className="text-2xl font-bold text-yellow-400">
              Love for Drawing
            </h3>
            <p className="mt-3 text-slate-300 leading-8">
              Ever since I was young, I enjoyed drawing characters,
              creating stories and imagining new worlds.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <h3 className="text-2xl font-bold text-cyan-400">
              Writing My First Comic
            </h3>
            <p className="mt-3 text-slate-300 leading-8">
              I turned my imagination into a real comic book,
              creating Lin and Leo's adventures.
            </p>
          </div>

          <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <h3 className="text-2xl font-bold text-green-400">
              More Adventures Ahead
            </h3>
            <p className="mt-3 text-slate-300 leading-8">
              This is just the beginning. I hope to create many more
              exciting stories for readers everywhere.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}