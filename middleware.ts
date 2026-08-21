import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Daftar bahasa yang didukung
const locales = ['en', 'id'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Abaikan file sistem Next.js, gambar statis, dan API agar tidak error
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('.') ||
    pathname.startsWith('/api')
  ) {
    return;
  }

  // Cek apakah URL sudah memiliki kode bahasa (contoh: /en atau /id/projects)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // PERUBAHAN: Jika pengunjung mengetik astroz.org (tanpa bahasa), 
  // otomatis arahkan ke bahasa Inggris (/en)
  request.nextUrl.pathname = `/en${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next).*)'],
};