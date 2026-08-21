import React from "react";
import Image from "next/image";

interface ImageGridProps {
  images: { src: string; alt: string; href?: string; }[];
  columns?: 2 | 3 | 4;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, columns = 3 }) => {
  const gridClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <div className={`grid ${gridClass} gap-6 md:gap-8 my-8`}>
      {images.map((image, index) => {
        const innerContent = (
          <>
            <Image
              alt={image.alt} src={image.src} fill priority sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-[var(--color-brutal-yellow)] border-t-4 border-[var(--color-brutal-border)] p-2 md:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-black font-black uppercase text-center text-xs md:text-sm truncate" style={{ fontFamily: "var(--font-oswald)" }}>
                {image.alt}
              </p>
            </div>
          </>
        );

        const containerClass = "relative w-full aspect-square block group bg-[var(--color-brutal-surface)] border-4 border-[var(--color-brutal-border)] shadow-[var(--shadow-brutal)] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[var(--shadow-brutal-lg)] transition-all duration-300 overflow-hidden cursor-pointer";

        return (
          <div key={index} className="w-full">
            {image.href ? (
              <a target="_blank" rel="noopener noreferrer" href={image.href} className={containerClass}>{innerContent}</a>
            ) : (
              <div className={containerClass}>{innerContent}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};