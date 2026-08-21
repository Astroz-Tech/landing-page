import Link from "next/link";
// PERBAIKAN: Mundur dua langkah karena berada di dalam folder [lang]/blog/
import { formatDate, getBlogPosts } from "../../lib/posts"; 

// Import Kamus Bahasa
import idDict from "../../dictionaries/id.json";
import enDict from "../../dictionaries/en.json";

export const metadata = {
  title: "Blog",
  description: "Artikel Astroz",
};

// PERBAIKAN NEXT.JS 15: Menggunakan async dan Promise untuk params
export default async function BlogPosts({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang as "id" | "en") || "id";
  const dict = lang === "en" ? enDict : idDict;

  let allBlogs = getBlogPosts();

  return (
    <div className="w-full flex flex-col items-center">
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        
        {/* HEADER SECTION MULTI-BAHASA */}
        <div className="mb-10 md:mb-16 border-b-4 border-[var(--color-brutal-border)] pb-6 flex flex-col items-start">
          <h1 
            className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tight text-[var(--color-brutal-text)] flex flex-wrap items-center gap-3 md:gap-4 leading-tight"
            style={{ fontFamily: "var(--font-oswald)" }}
          >
            {dict.blog.title} <span className="bg-[var(--color-brutal-red)] text-white px-3 md:px-4 py-1 md:py-2 border-4 border-[var(--color-brutal-border)] shadow-[var(--shadow-brutal)]">{dict.blog.highlight}</span>
          </h1>
          <p className="text-lg md:text-xl font-bold mt-6 max-w-2xl text-[var(--color-brutal-text)] opacity-80">
            {dict.blog.subtitle}
          </p>
        </div>

        {/* BLOG LIST SECTION */}
        <div className="flex flex-col gap-5 md:gap-6">
          {allBlogs
            .sort((a, b) => {
              if (
                new Date(a.metadata.publishedAt) >
                new Date(b.metadata.publishedAt)
              ) {
                return -1;
              }
              return 1;
            })
            .map((post) => (
              <Link
                key={post.slug}
                // URL otomatis menyesuaikan bahasa yang sedang aktif
                href={`/${lang}/blog/${post.slug}`} 
                className="group bg-[var(--color-brutal-surface)] border-4 border-[var(--color-brutal-border)] p-5 md:p-8 shadow-[var(--shadow-brutal)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[var(--shadow-brutal-lg)] hover:bg-[var(--color-brutal-yellow)] transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                {/* JUDUL ARTIKEL */}
                <h2 
                  className="text-xl md:text-3xl font-black uppercase text-[var(--color-brutal-text)] group-hover:text-black transition-colors break-words w-full md:w-auto"
                  style={{ fontFamily: "var(--font-oswald)" }}
                >
                  {post.metadata.title}
                </h2>
                
                {/* BADGE TANGGAL */}
                <div className="bg-[var(--color-brutal-border)] text-[var(--color-brutal-bg)] px-3 md:px-4 py-1.5 md:py-2 font-bold text-xs md:text-sm uppercase tracking-widest border-2 border-[var(--color-brutal-border)] group-hover:bg-white group-hover:text-black transition-colors shrink-0 shadow-[var(--shadow-brutal)] group-hover:shadow-none mt-2 md:mt-0">
                  {formatDate(post.metadata.publishedAt, false)}
                </div>
              </Link>
            ))}
        </div>

      </section>
    </div>
  );
}