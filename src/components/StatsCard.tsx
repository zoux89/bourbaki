"use client";

interface Stat {
  label: string;
  value: string;
}

interface StatsCardProps {
  stats: Stat[];
}

export default function StatsCard({ stats }: StatsCardProps) {
  return (
    <div className="bg-[#0a0a0a] border-3 border-white shadow-[4px_4px_0_0_#fff]">
      <div className="grid grid-cols-1 divide-y-3 divide-white">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 flex justify-between items-center hover:bg-[#1a1a1a] transition-colors"
          >
            <span className="text-gray-400 text-sm">{stat.label}</span>
            <span className="text-white font-bold">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

