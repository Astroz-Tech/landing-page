import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "./project-data";

// Import Kamus Bahasa
import idDict from "../../dictionaries/id.json";
import enDict from "../../dictionaries/en.json";

export const metadata: Metadata = {
  title: "Projects",
  description: "Inisiatif Astroz Org",
};

export default async function Projects({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  // Tunggu params terbuka (Aturan baru Next.js 15)
  const resolvedParams = await params;
  const lang = (resolvedParams.lang as "id" | "en") || "id";
  const dict = lang === "en" ? enDict : idDict;

  return (
    <div className="w-full flex flex-col items-center">
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        
        {/* HEADER */}
        <div className="mb-10 md:mb-16 border-b-4 border-[var(--color-brutal-border)] pb-6">
          <h1 
            className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-[var(--color-brutal-text)]"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            {dict.projects.title}
          </h1>
          <p className="text-lg md:text-xl font-bold mt-4 max-w-2xl text-[var(--color-brutal-text)] opacity-80">
            {dict.projects.subtitle}
          </p>
        </div>

        {/* PROJECTS GRID (Iterasi Card Multi-Bahasa) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {projects.map((project, index) => {
            const accentColors = [
              "bg-[var(--color-brutal-yellow)]",
              "bg-[var(--color-brutal-blue)]",
              "bg-[var(--color-brutal-red)]",
            ];
            const accent = accentColors[index % accentColors.length];
            const isCompleted = project.status === "Completed";
            
            // Terjemahkan Status
            const statusLabel = project.status ? dict.projects.status[project.status] : "—";

            return (
              <Link
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-[var(--color-brutal-surface)] border-4 border-[var(--color-brutal-border)] shadow-[var(--shadow-brutal-lg)] hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-300 relative cursor-pointer"
              >
                <div className={`w-full h-4 border-b-4 border-[var(--color-brutal-border)] ${accent}`}></div>
                
                <div className="p-5 md:p-8 flex flex-col flex-grow">
                  
                  {/* BADGES */}
                  <div className="flex justify-between items-center mb-6">
                    <span 
                      className="text-lg md:text-xl font-black border-2 border-[var(--color-brutal-border)] px-3 py-0.5 shadow-[var(--shadow-brutal)] text-[var(--color-brutal-text)]" 
                      style={{ fontFamily: "var(--font-oswald)" }}
                    >
                      {project.year}
                    </span>
                    <span 
                      className={`text-[10px] md:text-xs font-black uppercase border-2 border-[var(--color-brutal-border)] px-2 py-1 shadow-[var(--shadow-brutal)] ${
                        isCompleted ? 'bg-green-400 text-black' : 'bg-[var(--color-brutal-yellow)] text-black'
                      }`}
                    >
                      {statusLabel}
                    </span>
                  </div>

                  {/* TITLE */}
                  <h2 
                    className="text-2xl md:text-3xl font-black uppercase mb-4 text-[var(--color-brutal-text)] leading-tight group-hover:text-[var(--color-brutal-blue)] transition-colors break-words"
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {project.title}
                  </h2>

                  {/* ROLE */}
                  {project.role && (
                    <div className="mb-4">
                      <span className="bg-[var(--color-brutal-border)] text-[var(--color-brutal-bg)] text-[10px] md:text-xs font-bold px-2 py-1 uppercase tracking-wider">
                        {dict.projects.role}: {project.role[lang]}
                      </span>
                    </div>
                  )}

                  {/* DESCRIPTION */}
                  <p className="text-[var(--color-brutal-text)] text-sm md:text-base font-medium mb-8 flex-grow">
                    {project.description?.[lang]?.trim() ? project.description[lang] : "—"}
                  </p>

                  {/* TECH STACK */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t-4 border-dashed border-[var(--color-brutal-border)]">
                    {project.tech?.length ? (
                      project.tech.map((t: string) => (
                        <span
                          key={t}
                          className="border-2 border-[var(--color-brutal-border)] px-2 py-1 text-[10px] md:text-xs font-bold uppercase bg-[var(--color-brutal-bg)] text-[var(--color-brutal-text)] group-hover:bg-[var(--color-brutal-blue)] group-hover:text-white transition-colors"
                        >
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs font-bold uppercase opacity-50">{dict.projects.techEmpty}</span>
                    )}
                  </div>
                </div>
                
                {/* CALL TO ACTION BUTTON */}
                <div className="w-full border-t-4 border-[var(--color-brutal-border)] bg-[var(--color-brutal-border)] text-[var(--color-brutal-bg)] p-4 flex justify-between items-center group-hover:bg-[var(--color-brutal-yellow)] group-hover:text-black transition-colors">
                  <span className="font-bold uppercase tracking-widest text-xs md:text-sm">{dict.projects.visit}</span>
                  <span className="text-xl md:text-2xl font-black leading-none group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}