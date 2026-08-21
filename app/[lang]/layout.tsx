import "../globals.css";
import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Navbar } from "../components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "../components/footer";
import { ThemeProvider } from "../components/theme-switch";
import { metaData } from "../lib/config";

// 1. TAMBAHKAN preload: false PADA KONFIGURASI FONT
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  preload: false, // <--- Tambahkan ini agar browser tidak protes
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: 'swap',
  preload: false, // <--- Tambahkan ini juga
});

export const metadata: Metadata = {
  metadataBase: new URL(metaData.baseUrl),
  title: {
    default: metaData.title,
    template: `%s | ${metaData.title}`,
  },
  description: metaData.description,
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  
  return (
      <html lang={resolvedParams.lang} className={`${inter.variable} ${oswald.variable}`} suppressHydrationWarning>
      
      {/* 2. UBAH 'font-sans' MENJADI '${inter.className}' AGAR FONT BENAR-BENAR DIGUNAKAN */}
      <body className={`antialiased min-h-screen flex flex-col ${inter.className} bg-[var(--color-brutal-bg)] text-[var(--color-brutal-text)]`} suppressHydrationWarning>
      
      <ThemeProvider
          attribute="class"
          defaultTheme="system" 
          enableSystem={true}
          disableTransitionOnChange
      >
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
          <Navbar />
          <main className="flex-auto w-full flex flex-col">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </ThemeProvider>
      </body>
      </html>
  );
}