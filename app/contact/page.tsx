export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-black text-white pt-32">

      <section className="max-w-6xl mx-auto px-6">

        <div className="text-center">

          <span className="inline-block rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-bold uppercase tracking-widest text-cyan-300">
            Contact
          </span>

          <h1 className="mt-6 text-6xl font-black">
            Get In Touch
          </h1>

          <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto">
            We'd love to hear from readers, parents, schools and comic fans.
          </p>

        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2">

          {/* Contact Info */}

          <div className="space-y-8">

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

              <h2 className="text-2xl font-bold text-yellow-400">
                Email
              </h2>

              <p className="mt-4 text-slate-300">
                contact@prakharscomicworld.world
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

              <h2 className="text-2xl font-bold text-cyan-400">
                Instagram
              </h2>

              <p className="mt-4 text-slate-300">
                @lin.and.leo
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

              <h2 className="text-2xl font-bold text-green-400">
                Location
              </h2>

              <p className="mt-4 text-slate-300">
                India
              </p>

            </div>

          </div>

          {/* Contact Form */}

          <form className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-6">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-xl bg-slate-900 px-5 py-4 outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-xl bg-slate-900 px-5 py-4 outline-none"
            />

            <input
              type="text"
              placeholder="Subject"
              className="w-full rounded-xl bg-slate-900 px-5 py-4 outline-none"
            />

            <textarea
              rows={6}
              placeholder="Your Message..."
              className="w-full rounded-xl bg-slate-900 px-5 py-4 outline-none"
            />

            <button
              type="submit"
              className="w-full rounded-full bg-yellow-400 py-4 font-bold text-black transition hover:scale-105"
            >
              Send Message
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}