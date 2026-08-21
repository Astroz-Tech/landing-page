"use client";

import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";
import { ThemeSwitch } from "./theme-switch";
import { metaData } from "../lib/config";
import { useState, useTransition } from "react";

// Teks dikunci statis ke bahasa Inggris
const navItems = {
  "/": { name: "Home" },
  "/blog": { name: "Blog" },
  "/projects": { name: "Projects" },
  "/photos": { name: "Photos" },
};

export function Navbar() {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  // Fitur transisi React untuk mendeteksi status loading halaman
  const [isPending, startTransition] = useTransition();

  const currentLang = (params?.lang as string) || "en";

  const toggleLanguage = () => {
    const newLang = currentLang === "id" ? "en" : "id";
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    
    // Membungkus perpindahan route ke dalam transisi agar kita tahu kapan prosesnya selesai
    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <nav className="w-full bg-[var(--color-brutal-bg)] border-b-4 border-[var(--color-brutal-border)] sticky top-0 z-50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4">
        <div className="flex flex-row items-center justify-between">
          
          <Link 
            href={`/${currentLang}`} 
            className="text-2xl md:text-3xl font-black uppercase tracking-tighter hover:-translate-y-0.5 transition-transform text-[var(--color-brutal-text)]" 
            style={{ fontFamily: "var(--font-oswald)" }}
            onClick={() => setIsOpen(false)}
          >
            {metaData.title}
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <div className="flex items-center gap-6 lg:gap-8 font-bold uppercase text-base" style={{ fontFamily: "var(--font-oswald)" }}>
              {Object.entries(navItems).map(([path, { name }]) => {
                const targetPath = `/${currentLang}${path === "/" ? "" : path}`;
                const isActive = pathname === targetPath || (path !== "/" && pathname.startsWith(`/${currentLang}${path}`));
                
                return (
                  <Link
                    key={path}
                    href={targetPath}
                    className={`transition-all pb-1 hover:text-[var(--color-brutal-blue)] ${
                      isActive 
                        ? "border-b-4 border-[var(--color-brutal-blue)] text-[var(--color-brutal-text)]" 
                        : "border-b-4 border-transparent text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
            
            <div className="flex items-center gap-3 lg:gap-4 border-l-4 border-[var(--color-brutal-border)] pl-4 lg:pl-6">
              
              {/* TOMBOL GANTI BAHASA DENGAN EFEK LOADING */}
              <button
                onClick={toggleLanguage}
                disabled={isPending}
                className="w-[80px] flex items-center justify-center bg-[var(--color-brutal-surface)] border-2 border-[var(--color-brutal-border)] text-[var(--color-brutal-text)] font-black uppercase px-3 py-1 text-xs md:text-sm shadow-[var(--shadow-brutal)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-70 disabled:cursor-wait"
              >
                {isPending ? (
                  // Ikon Spinner Berputar saat sedang loading
                  <svg className="animate-spin h-4 w-4 text-[var(--color-brutal-text)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  currentLang === "id" ? "🇮🇩 ID" : "🇬🇧 EN"
                )}
              </button>

              <ThemeSwitch />
              
              <Link
                href={`/${currentLang}/donate`}
                className="flex items-center justify-center bg-[var(--color-brutal-yellow)] border-2 border-[var(--color-brutal-border)] font-black uppercase px-5 py-2 text-sm shadow-[var(--shadow-brutal)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-black"
                style={{ fontFamily: "var(--font-oswald)" }}
              >
                DONATE
              </Link>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={toggleLanguage} 
              disabled={isPending}
              className="bg-[var(--color-brutal-surface)] border-2 border-[var(--color-brutal-border)] text-[var(--color-brutal-text)] font-black uppercase px-2 py-1 text-xs shadow-[var(--shadow-brutal)] w-[60px] flex items-center justify-center disabled:opacity-70 disabled:cursor-wait"
            >
               {isPending ? (
                  <svg className="animate-spin h-3.5 w-3.5 text-[var(--color-brutal-text)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  currentLang === "id" ? "ID" : "EN"
                )}
            </button>
            <ThemeSwitch />
            <button onClick={() => setIsOpen(!isOpen)} className="p-1.5 bg-[var(--color-brutal-surface)] border-2 border-[var(--color-brutal-border)] text-[var(--color-brutal-text)] shadow-[var(--shadow-brutal)] flex items-center justify-center">
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>

        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isOpen && (
          <div className="md:hidden flex flex-col mt-4 pt-4 border-t-4 border-[var(--color-brutal-border)] gap-4 pb-2">
            <div className="flex flex-col gap-4 font-bold uppercase text-lg" style={{ fontFamily: "var(--font-oswald)" }}>
              {Object.entries(navItems).map(([path, { name }]) => {
                const targetPath = `/${currentLang}${path === "/" ? "" : path}`;
                const isActive = pathname === targetPath || (path !== "/" && pathname.startsWith(`/${currentLang}${path}`));
                return (
                  <Link
                    key={path}
                    href={targetPath}
                    onClick={() => setIsOpen(false)}
                    className={`transition-all w-fit ${isActive ? "border-b-4 border-[var(--color-brutal-blue)] text-[var(--color-brutal-text)] pb-1" : "text-gray-500 pb-1"}`}
                  >
                    {name}
                  </Link>
                );
              })}
            </div>
            <Link
              href={`/${currentLang}/donate`}
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full flex items-center justify-center bg-[var(--color-brutal-yellow)] border-2 border-[var(--color-brutal-border)] font-black uppercase px-5 py-3 text-base shadow-[var(--shadow-brutal)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-black"
              style={{ fontFamily: "var(--font-oswald)" }}
            >
              DONATE NOW
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}