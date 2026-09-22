"use client";

import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { useGames, defaultFilters } from "@/components/game-provider";
import { SportIcon } from "@/components/sport-icon";
import { sports, type SportFilter } from "@/lib/games";

export function FilterBar() {
  const { filters, setFilters } = useGames();
  const active = filters.sport !== "All sports" || filters.distance !== 10 || filters.openOnly;
  return (
    <section aria-label="Game filters" data-testid="filter-bar" className="min-w-0 rounded-2xl border border-line bg-white px-4 py-4 sm:px-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div role="group" aria-label="Filter by sport" className="flex flex-wrap gap-2">
          {(["All sports", ...sports] as SportFilter[]).map((sport) => <button key={sport} type="button" aria-pressed={filters.sport === sport} onClick={() => setFilters({ ...filters, sport })} className={`inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${filters.sport === sport ? "bg-forest text-white" : "bg-[#f6f7f3] text-muted hover:bg-sage hover:text-forest"}`}><SportIcon sport={sport === "All sports" ? undefined : sport} className="size-4" />{sport}</button>)}
        </div>
        <div className="flex shrink-0 items-center gap-3 border-t border-line pt-3 xl:border-l xl:border-t-0 xl:pl-5 xl:pt-0">
          <SlidersHorizontal className="size-4 text-muted" />
          <label htmlFor="distance-filter" className="text-xs font-semibold text-muted">Distance</label>
          <select id="distance-filter" value={filters.distance} onChange={(event) => setFilters({ ...filters, distance: Number(event.target.value) })} className="min-h-10 rounded-lg border border-line bg-white px-2 text-xs font-semibold">
            {[1, 2, 5, 10].map((distance) => <option key={distance} value={distance}>Within {distance} {distance === 1 ? "mile" : "miles"}</option>)}
          </select>
        </div>
      </div>
      <div className="mt-3 flex min-h-7 flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <p>Find your sport. Make room for a little play.</p>
        <div className="flex items-center gap-4"><label className="flex cursor-pointer items-center gap-2 py-1"><input type="checkbox" checked={filters.openOnly} onChange={(event) => setFilters({ ...filters, openOnly: event.target.checked })} className="size-4 accent-forest" />Open spots only</label>{active && <button type="button" onClick={() => setFilters(defaultFilters)} className="flex items-center gap-1.5 py-1 font-semibold text-forest"><RotateCcw className="size-3" />Reset filters</button>}</div>
      </div>
    </section>
  );
}
