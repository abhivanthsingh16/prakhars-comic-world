import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-black px-6 text-white">

      <div className="max-w-2xl text-center">

        <p className="text-lg font-bold uppercase tracking-[0.4em] text-cyan-400">
          Error 404
        </p>

        <h1 className="mt-6 text-7xl font-black">
          Lost In Space
        </h1>

        <p className="mt-8 text-xl leading-9 text-slate-300">
          Oops! Lin couldn't find the page you're looking for.
          Let's get you back to the adventure.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-5">

          <Link
            href="/"
            className="rounded-full bg-yellow-400 px-8 py-4 font-bold text-black transition hover:scale-105"
          >
            Go Home
          </Link>

          <Link
            href="/comics"
            className="rounded-full border border-white px-8 py-4 transition hover:bg-white hover:text-black"
          >
            Read Comics
          </Link>

        </div>

      </div>

    </main>
  );
}