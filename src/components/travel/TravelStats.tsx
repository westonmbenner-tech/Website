"use client";

import type { TravelStat } from "@/data/travelData";

type TravelStatsProps = {
  stats: readonly TravelStat[];
};

export function TravelStats({ stats }: TravelStatsProps) {
  return (
    <div className="travel-stats" aria-label="Travel summary">
      {stats.map((stat) => (
        <article className="travel-stat-card" key={stat.label}>
          <span className="travel-stat-value">{stat.value}</span>
          <span className="travel-stat-label">{stat.label}</span>
        </article>
      ))}
    </div>
  );
}
