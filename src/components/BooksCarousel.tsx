"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

interface Book {
  title: string;
  author: string;
  url: string;
  progress?: number;
}

interface BooksCarouselProps {
  books?: Book[];
}

const defaultBooks: Book[] = [
  { title: "Analysis of Boolean Functions", author: "Ryan O'Donnell", url: "https://arxiv.org/abs/2105.10386" },
  { title: "Mathematical Foundations of Automata Theory", author: "Jean-Éric Pin", url: "https://www.irif.fr/~jep/PDF/MPRI/MPRI.pdf" },
  { title: "Games on Graphs: From Logic and Automata to Algorithms", author: "Nathanaël Fijalkow et al.", url: "https://arxiv.org/abs/2305.10546" },
  { title: "Mathematical Logic", author: "Stephen Cole Kleene", url: "https://books.google.com.vc/books?id=4GzCAgAAQBAJ&printsec=frontcover&source=gbs_vpt_read#v=onepage&q&f=false" },
  { title: "The Open Logic Text Complete Build", author: "OpenLogic Project", url: "https://builds.openlogicproject.org/open-logic-complete.pdf" },
];

export default function BooksCarousel({ books = defaultBooks }: BooksCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? books.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === books.length - 1 ? 0 : prev + 1));
  };

  const currentBook = books[currentIndex];

  const handleCardClick = () => {
    const newWindow = window.open(currentBook.url, "_blank");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-[var(--nb-primary)] border-3 border-[var(--nb-border)] p-6 shadow-[4px_4px_0_0_var(--nb-border)] h-full flex flex-col cursor-pointer hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_var(--nb-border)] transition-all group"
    >
      <div className="flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
        <span className="text-white font-semibold text-sm uppercase tracking-wider">Currently Reading</span>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center gap-4 w-full justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-white/20 transition-colors flex-shrink-0 z-10"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-[180px]">
            <div className="text-6xl font-bold text-white mb-3 group-hover:scale-105 transition-transform">
              {currentIndex + 1}
            </div>
            <div className="text-white font-semibold truncate w-full text-sm">{currentBook.title}</div>
            <div className="text-white/70 text-xs truncate w-full mb-2">{currentBook.author}</div>
            {currentBook.progress && (
              <div className="w-full bg-white/30 h-1 mt-1">
                <div 
                  className="bg-white h-1 transition-all" 
                  style={{ width: `${currentBook.progress}%` }}
                />
              </div>
            )}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="w-10 h-10 border-2 border-white flex items-center justify-center hover:bg-white/20 transition-colors flex-shrink-0 z-10"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

