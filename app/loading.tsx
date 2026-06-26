export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950">

      <div className="text-center">

        <div className="mx-auto h-20 w-20 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />

        <p className="mt-8 text-xl text-white">
          Loading Adventure...
        </p>

      </div>

    </main>
  );
}