import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">

      <div className="text-center">

        <h1 className="text-6xl font-black text-green-400">
          Payment Successful 🎉
        </h1>

        <p className="mt-6 text-xl text-slate-300">
          Thank you for purchasing The Alien Friend Lin.
        </p>

        <Link
          href="/"
          className="mt-10 inline-block rounded-full bg-yellow-400 px-8 py-4 font-bold text-black"
        >
          Back to Home
        </Link>

      </div>

    </main>
  );
}