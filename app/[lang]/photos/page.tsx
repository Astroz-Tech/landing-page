import React from "react";
import type { Metadata } from "next";
import { ImageGrid } from "../../components/image-grid"; 

// Import Kamus Bahasa
import idDict from "../../dictionaries/id.json";
import enDict from "../../dictionaries/en.json";

export const metadata: Metadata = {
  title: "Photos",
  description: "Galeri Astroz Org",
};

// PERBAIKAN NEXT.JS 15: Menggunakan async dan Promise untuk params
export default async function Photos({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  // Tunggu params terbuka (Aturan baru Next.js 15)
  const resolvedParams = await params;
  const lang = (resolvedParams.lang as "id" | "en") || "en";
  const dict = lang === "en" ? enDict : idDict;

  return (
    <div className="w-full flex flex-col items-center">
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        
        {/* HEADER SECTION MULTI-BAHASA */}
        <div className="mb-12 md:mb-16 border-b-4 border-[var(--color-brutal-border)] pb-6 flex flex-col">
          <h1 
            className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-[var(--color-brutal-text)] flex items-center gap-2 md:gap-4"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            <span className="text-[var(--color-brutal-blue)] text-3xl md:text-6xl">📸</span> {dict.photos.title}
          </h1>
          <p className="text-base md:text-xl font-bold mt-4 max-w-2xl text-[var(--color-brutal-text)]">
            {dict.photos.desc1} <span className="bg-[var(--color-brutal-yellow)] text-black px-2 py-0.5 border-2 border-[var(--color-brutal-border)] inline-block mt-2 sm:mt-0">{dict.photos.descHighlight}</span> {dict.photos.desc2}
          </p>
        </div>

        {/* SECTION 1: Grid 3 Kolom */}
        <div className="mb-12 md:mb-16">
          <div className="inline-block bg-[var(--color-brutal-yellow)] border-4 border-[var(--color-brutal-border)] px-4 md:px-6 py-2 mb-4 shadow-[var(--shadow-brutal)]">
            <h2 className="text-xl md:text-2xl font-black uppercase text-black" style={{ fontFamily: "var(--font-oswald)" }}>
              {dict.photos.section1}
            </h2>
          </div>
          <ImageGrid
            columns={3}
            images={[
              { src: "/photos/photo1.jpg", alt: "Roman columns", href: "#" },
              { src: "/photos/photo2.jpg", alt: "Big Ben", href: "#" },
              { src: "/photos/photo3.jpg", alt: "Sacré-Cœur Basilica", href: "#" },
              { src: "/photos/photo4.jpg", alt: "Eiffel Tower", href: "#" },
              { src: "/photos/photo5.jpg", alt: "Taj Mahal", href: "#" },
              { src: "/photos/photo6.jpg", alt: "Colosseum", href: "#" },
            ]}
          />
        </div>

      </section>
    </div>
  );
}