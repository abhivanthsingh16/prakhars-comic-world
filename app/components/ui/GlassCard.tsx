import { ReactNode } from "react";

export default function GlassCard({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-md p-8 shadow-xl">
      {children}
    </div>
  );
}