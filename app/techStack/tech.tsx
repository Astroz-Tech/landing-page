export default function TechPage() {
  const movementPillars = [
    "Teknologi Untuk Semua",
    "Terbuka Untuk Semua",
    "Berbasis Komunitas",
    "Belajar & Mencipta",
    "Berani Bereksperimen",
    "Keterbukaan Data",
    "Kolaborasi",
  ];

  const brutalColors = [
    "bg-[var(--color-brutal-yellow)] text-black",
    "bg-[var(--color-brutal-blue)] text-white",
    "bg-[var(--color-brutal-red)] text-white",
    "bg-[var(--color-brutal-surface)] text-[var(--color-brutal-text)]",
  ];

  return (
    <div className="w-full">
      <p className="mb-6 md:mb-8 text-sm md:text-lg font-bold text-[var(--color-brutal-text)] max-w-3xl leading-relaxed border-l-8 border-[var(--color-brutal-blue)] pl-3 md:pl-4">
        Kami membangun teknologi sebagai ruang untuk belajar, bereksperimen,
        berkolaborasi, dan menciptakan solusi nyata. Bagi ASTROZ, teknologi
        bukan hanya milik mereka yang terbaik, tetapi terbuka bagi siapa pun
        yang berani mencoba dan ikut menciptakan.
      </p>

      <div className="flex flex-wrap gap-2 md:gap-4">
        {movementPillars.map((pillar, index) => {
          const colorClass = brutalColors[index % brutalColors.length];

          return (
            <span
              key={pillar}
              className={`
                ${colorClass}
                border-2 border-[var(--color-brutal-border)]
                px-3 py-1.5 md:px-5 md:py-2
                text-xs sm:text-sm md:text-lg font-black uppercase
                shadow-[var(--shadow-brutal)]
                hover:-translate-y-1 hover:-translate-x-1
                hover:shadow-[var(--shadow-brutal-lg)]
                transition-all cursor-default
              `}
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              {pillar}
            </span>
          );
        })}
      </div>
    </div>
  );
}