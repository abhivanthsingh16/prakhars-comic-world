export default function BackgroundGlow() {
  return (
    <>
      <div className="absolute left-[-250px] top-20 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[140px]" />

      <div className="absolute right-[-200px] bottom-0 h-[450px] w-[450px] rounded-full bg-violet-500/20 blur-[130px]" />

      <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />
    </>
  );
}