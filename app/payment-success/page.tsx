import Link from "next/link";

export default async function PaymentSuccess({ searchParams }: { searchParams: Promise<{ method?: string; order?: string }> }) {
  const params = await searchParams;
  const cod = params.method === "COD";
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="max-w-xl text-center">
        <div className="text-6xl">{cod ? "📦" : "🎉"}</div>
        <h1 className="mt-5 text-4xl font-black text-yellow-400">{cod ? "Order placed!" : "Payment successful!"}</h1>
        <p className="mt-5 text-lg text-slate-300">
          {cod ? "Thank you. Please keep the payment ready when your book is delivered." : "Thank you for purchasing The Alien Friend Lin."}
        </p>
        {params.order && <p className="mt-4 rounded-xl bg-white/5 p-4 text-sm text-slate-300">Order reference: <strong className="text-white">{params.order}</strong></p>}
        <p className="mt-4 text-sm text-slate-400">Our team will contact you about delivery and shipping charges.</p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-yellow-400 px-8 py-4 font-bold text-black">Back to Home</Link>
      </div>
    </main>
  );
}
