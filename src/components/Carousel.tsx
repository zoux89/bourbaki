"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  items: number[];
}

export default function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-[#0066FF] border-3 border-white p-6 shadow-[4px_4px_0_0_#fff]">
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={goToPrevious}
          className="w-8 h-8 border-2 border-white flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        
        <span className="text-6xl font-bold text-white min-w-[80px] text-center">
          {items[currentIndex]}
        </span>
        
        <button
          onClick={goToNext}
          className="w-8 h-8 border-2 border-white flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}

