"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import anime from "animejs";

// Import Kamus Bahasa
import idDict from "../dictionaries/id.json";
import enDict from "../dictionaries/en.json";

export default function Page() {
  const params = useParams();
  const lang = (params?.lang as "id" | "en") || "en"; 
  const dict = lang === "en" ? enDict : idDict;

  const missionRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLElement>(null); 
  const sliderRef = useRef<HTMLDivElement>(null); 

  const previewImages = [
    "/photos/photo1.jpg", 
    "/photos/photo2.jpg", 
    "/photos/photo3.jpg", 
    "/photos/photo4.jpg",
    "/photos/photo5.jpg"
  ];

  const scrollLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: -350, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: 350, behavior: 'smooth' });
  };

  useEffect(() => {
    // Hero Text Animation
    anime({ targets: '.hero-element', translateY: [50, 0], opacity: [0, 1], easing: 'easeOutElastic(1, 0.6)', duration: 1200, delay: anime.stagger(150) });
    
    // Hero Image Animation (NEW)
    // Menambahkan animasi melayang terus menerus pada gambar Hero
    anime({
      targets: '.hero-image',
      translateY: [-10, 10], // Bergerak naik turun 10px
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 3000 // Durasi 3 detik untuk satu siklus
    });

    anime({ targets: '.red-glow', scale: [1, 1.2], opacity: [0.3, 0.6], direction: 'alternate', loop: true, easing: 'easeInOutSine', duration: 2500 });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === missionRef.current) {
            anime({ targets: '.mission-card', rotate: [5, -1], translateY: [100, 0], opacity: [0, 1], easing: 'easeOutElastic(1, 0.5)', duration: 1500 });
            observer.unobserve(entry.target);
          }
          if (entry.target === previewRef.current) {
            anime({ targets: '.preview-card', translateY: [50, 0], opacity: [0, 1], easing: 'easeOutExpo', duration: 800, delay: anime.stagger(100) });
            observer.unobserve(entry.target);
          }
        }
      });
    }, { threshold: 0.2 });

    if (missionRef.current) observer.observe(missionRef.current);
    if (previewRef.current) observer.observe(previewRef.current);

    return () => observer.disconnect();
  }, [lang]); 

  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-30 overflow-visible">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          
          <div className="hero-element opacity-0 w-full lg:w-1/2 bg-[var(--color-brutal-yellow)] border-4 border-[var(--color-brutal-border)] p-6 md:p-12 shadow-[var(--shadow-brutal-lg)] flex flex-col justify-center">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black uppercase leading-[1] mb-4 md:mb-6 text-black tracking-tighter break-words" style={{ fontFamily: "var(--font-oswald)" }}>
              {dict.hero.title}
            </h1>
            <p className="text-base sm:text-lg md:text-2xl font-bold text-black mb-6 leading-snug">
              {dict.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3 mt-auto">
              {dict.hero.tags.map((t: string) => (
                <span key={t} className="bg-[var(--color-brutal-surface)] border-2 border-[var(--color-brutal-border)] text-[var(--color-brutal-text)] px-2.5 py-1 md:px-4 md:py-1.5 text-[10px] sm:text-xs md:text-base font-bold uppercase shadow-[var(--shadow-brutal)]" style={{ fontFamily: "var(--font-oswald)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-element opacity-0 w-full lg:w-1/2 h-[300px] sm:h-[400px] lg:h-auto relative group border-4 border-[var(--color-brutal-border)] shadow-[var(--shadow-brutal-lg)] overflow-hidden flex items-center justify-center bg-white">
             {/* PERBAIKAN: Menambahkan class 'hero-image' dan object-contain */}
             <div className="relative w-full h-full hero-image"> 
               <Image 
                 src="/BYWM.png" 
                 alt="Kegiatan Astroz" 
                 fill 
                 sizes="(max-width: 768px) 100vw, 50vw"
                 // Mengubah object-cover menjadi object-contain agar seluruh gambar terlihat, 
                 // dan menghapus efek grayscale karena ini mungkin logo/karakter
                 className="object-contain transition-transform duration-500 hover:scale-105 p-4 md:p-8" 
                 priority 
               />
             </div>
          </div>

        </div>
      </section>

      {/* 2. MISI KAMI */}
      <section ref={missionRef} className="relative bg-[var(--color-brutal-bg-alt)] text-[var(--color-brutal-text-alt)] w-full border-y-4 border-[var(--color-brutal-border)] py-12 md:py-30 mt-4 md:mt-8 overflow-hidden">
        <div className="red-glow absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-red-600 rounded-full mix-blend-screen filter blur-[80px] md:blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center flex flex-col items-center">
           <h2 className="text-[var(--color-brutal-red)] text-3xl md:text-5xl font-black uppercase mb-6 md:mb-8 tracking-wider flex items-center gap-2 md:gap-3" style={{ fontFamily: "var(--font-oswald)" }}>
             <span className="text-2xl md:text-3xl">👁</span> {dict.mission.title}
           </h2>
           
           <div className="mission-card opacity-0 bg-[var(--color-brutal-surface)] border-4 border-[var(--color-brutal-border)] p-6 md:p-12 shadow-[var(--shadow-brutal-lg)] text-left">
             <div className="prose prose-base md:prose-lg max-w-none text-[var(--color-brutal-text)] font-medium leading-relaxed">
                <p>{dict.mission.p1}</p>
                <div className="mt-6 md:mt-8 border-l-8 border-[var(--color-brutal-blue)] bg-[var(--color-brutal-bg)] p-4 md:p-6 border-y-4 border-r-4 border-[var(--color-brutal-border)]">
                  <p className="text-base md:text-2xl italic font-bold mb-3 md:mb-4 text-[var(--color-brutal-text)]" style={{ fontFamily: "var(--font-oswald)" }}>
                    {dict.mission.quote}
                  </p>
                  <span className="block text-[10px] md:text-sm font-bold opacity-80 uppercase tracking-widest text-[var(--color-brutal-text)]">
                    {dict.mission.quoteAuthor}
                  </span>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* 3. VISUAL HIGHLIGHTS / IMAGE SLIDER (PENGGANTI METRICS) */}
      <section ref={previewRef} className="w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        
        {/* Header & Navigasi Slider */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[var(--color-brutal-text)]" style={{ fontFamily: "var(--font-oswald)" }}>
              {dict.preview.title}
            </h2>
            <p className="text-sm md:text-base font-bold mt-2 text-[var(--color-brutal-text)] opacity-80 uppercase tracking-widest border-l-4 border-[var(--color-brutal-blue)] pl-3">
              {dict.preview.subtitle}
            </p>
          </div>
          
          {/* Tombol Kiri Kanan (Brutalism) */}
          <div className="flex gap-3">
            <span className="hidden md:flex items-center text-xs font-black uppercase tracking-widest mr-2 opacity-50">
              {dict.preview.drag}
            </span>
            <button onClick={scrollLeft} aria-label="Scroll Left" className="w-10 h-10 md:w-12 md:h-12 bg-[var(--color-brutal-surface)] text-[var(--color-brutal-text)] border-4 border-[var(--color-brutal-border)] shadow-[var(--shadow-brutal)] flex items-center justify-center hover:bg-[var(--color-brutal-yellow)] hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={scrollRight} aria-label="Scroll Right" className="w-10 h-10 md:w-12 md:h-12 bg-[var(--color-brutal-surface)] text-[var(--color-brutal-text)] border-4 border-[var(--color-brutal-border)] shadow-[var(--shadow-brutal)] flex items-center justify-center hover:bg-[var(--color-brutal-yellow)] hover:text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Kontainer Slider (Bisa di-swipe di HP) */}
        <div ref={sliderRef} className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 pt-2 px-1 -mx-1">
          {previewImages.map((src, index) => {
            // Rotasi warna aksen pada kotak label
            const accentColors = ["bg-[var(--color-brutal-yellow)] text-black", "bg-[var(--color-brutal-blue)] text-white", "bg-[var(--color-brutal-red)] text-white"];
            const colorClass = accentColors[index % accentColors.length];

            return (
              <div 
                key={index} 
                className="preview-card opacity-0 shrink-0 w-[85vw] sm:w-[60vw] md:w-[400px] h-[250px] md:h-[300px] relative snap-center border-4 border-[var(--color-brutal-border)] shadow-[var(--shadow-brutal-lg)] group overflow-hidden bg-[var(--color-brutal-surface)] cursor-pointer"
              >
                {/* Fallback ke profile.png jika gambar gagal dimuat (sementara) */}
                <Image 
                  src={src} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105" 
                  alt={`Preview ${index + 1}`} 
                  onError={(e) => { e.currentTarget.src = "/profile.png"; }}
                />
                
                {/* Badge Angka Khas Brutalism */}
                <div className={`absolute top-4 left-4 ${colorClass} border-4 border-[var(--color-brutal-border)] px-3 py-1.5 text-sm md:text-base font-black uppercase shadow-[var(--shadow-brutal)] z-10`} style={{ fontFamily: "var(--font-oswald)" }}>
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. PILAR PERGERAKAN */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 pb-12 md:pb-24">
        <div className="bg-[var(--color-brutal-bg)] border-4 border-[var(--color-brutal-border)] p-5 sm:p-6 md:p-12 shadow-[var(--shadow-brutal-lg)]">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase mb-6 md:mb-8 border-b-4 border-[var(--color-brutal-border)] pb-3 md:pb-4 text-[var(--color-brutal-text)]" style={{ fontFamily: "var(--font-oswald)" }}>
            {dict.pillars.title}
          </h2>
          <div className="mt-6 md:mt-8">
            <p className="mb-6 md:mb-8 text-sm md:text-lg font-bold text-[var(--color-brutal-text)] max-w-3xl leading-relaxed border-l-8 border-[var(--color-brutal-blue)] pl-4 md:pl-6">
              {dict.pillars.desc}
            </p>
            
            <div className="flex flex-wrap gap-2 md:gap-4">
              {dict.pillars.items.map((pillar: string, index: number) => {
                const brutalColors = ["bg-[var(--color-brutal-yellow)] text-black", "bg-[var(--color-brutal-blue)] text-white", "bg-[var(--color-brutal-red)] text-white", "bg-[var(--color-brutal-surface)] text-[var(--color-brutal-text)]"];
                const colorClass = brutalColors[index % brutalColors.length];
                
                return (
                  <span
                    key={pillar}
                    className={`${colorClass} border-2 border-[var(--color-brutal-border)] px-3 py-1.5 md:px-5 md:py-2 text-[10px] sm:text-xs md:text-base font-black uppercase shadow-[var(--shadow-brutal)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[var(--shadow-brutal-lg)] transition-all cursor-default`}
                    style={{ fontFamily: "var(--font-oswald)" }}
                  >
                    {pillar}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="w-full bg-[var(--color-brutal-blue)] border-t-4 border-[var(--color-brutal-border)] py-16 md:py-28 flex flex-col items-center justify-center px-4">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-center text-white leading-[1.1] tracking-tight max-w-4xl" style={{ fontFamily: "var(--font-oswald)" }}>
          {dict.cta.title}
        </h2>
        
        <Link href={`/${lang}/donate`} className="mt-10 md:mt-12 bg-[var(--color-brutal-yellow)] text-black border-4 border-[var(--color-brutal-border)] shadow-[var(--shadow-brutal-lg)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center px-8 md:px-10 py-3 md:py-4 group">
          <span className="font-black uppercase tracking-widest text-lg md:text-2xl" style={{ fontFamily: "var(--font-oswald)" }}>
            {dict.cta.button}
          </span>
          <span className="ml-3 text-2xl md:text-3xl font-black leading-none group-hover:translate-x-2 transition-transform">→</span>
        </Link>
      </section>

    </div>
  );
}