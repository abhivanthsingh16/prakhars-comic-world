import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <h2 className="text-3xl font-black text-yellow-400">
          Prakhar's Comic World
        </h2>

        <p className="mt-4 text-gray-400 max-w-xl">
          Inspiring young readers through imagination,
          adventure and creativity.
        </p>

        <div className="flex flex-wrap gap-6 mt-8">

          <Link href="/">Home</Link>
          <Link href="/comics">Comics</Link>
          <Link href="/author">Author</Link>
          <Link href="/store">Store</Link>
          <Link href="/contact">Contact</Link>

        </div>

        <p className="mt-10 text-sm text-gray-500">
          © 2026 Prakhar's Comic World. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}