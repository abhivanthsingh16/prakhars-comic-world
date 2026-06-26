export default function Stars() {

  const stars = Array.from({ length: 120 });

  return (
    <div className="absolute inset-0 overflow-hidden">

      {stars.map((_, i) => (
        <span
          key={i}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            width: Math.random() * 3 + "px",
            height: Math.random() * 3 + "px",
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
            opacity: Math.random(),
            animationDelay: Math.random() * 3 + "s"
          }}
        />
      ))}

    </div>
  );
}