"use client";

import { Camera } from "lucide-react";

interface Snapshot {
  src: string;
  alt: string;
  caption: string;
}

interface SnapshotsProps {
  snapshots?: Snapshot[];
}

const defaultSnapshots: Snapshot[] = [
  {
    src: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=800&h=600&fit=crop",
    alt: "Cherry blossoms",
    caption: "Flowers, trees and bushes reach their peak of full bloom",
  },
];

export default function Snapshots({ snapshots = defaultSnapshots }: SnapshotsProps) {
  const snapshot = snapshots[0];

  return (
    <div className="border-3 border-[var(--nb-border)] shadow-[4px_4px_0_0_var(--nb-border)] h-full flex flex-col overflow-hidden">
      <div className="bg-[var(--nb-bg-card)] border-b-3 border-[var(--nb-border)] px-4 py-2 flex items-center gap-2">
        <Camera className="w-4 h-4 text-[var(--nb-text)]" />
        <span className="text-sm font-semibold text-[var(--nb-text)]">Snapshots</span>
      </div>
      
      <div className="relative flex-1 group">
        <img
          src={snapshot.src}
          alt={snapshot.alt}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-[var(--nb-primary)]/90 p-4">
          <p className="text-white font-semibold text-sm leading-relaxed">
            {snapshot.caption}
          </p>
        </div>
      </div>
    </div>
  );
}

