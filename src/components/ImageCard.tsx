"use client";

interface ImageCardProps {
  src: string;
  alt: string;
  caption: string;
}

export default function ImageCard({ src, alt, caption }: ImageCardProps) {
  return (
    <div className="border-3 border-white shadow-[4px_4px_0_0_#fff] overflow-hidden relative group">
      <img
        src={src}
        alt={alt}
        className="w-full h-64 object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-[#0066FF]/90 p-4 border-t-3 border-white">
        <p className="text-white font-semibold text-sm leading-relaxed">{caption}</p>
      </div>
    </div>
  );
}

