"use client";

import { ArrowUpRight, MapPin, MoveUpRight, Search, Sparkles } from "lucide-react";
import { FilterBar } from "@/components/filter-bar";
import { GameCard } from "@/components/game-card";
import { MapPanel } from "@/components/map-panel";
import { defaultFilters, useGames, type Filters } from "@/components/game-provider";
import { games } from "@/lib/games";

export function DiscoverExplorer() {
  const { filters, setFilters, playerCount } = useGames();
  const visibleGames = games.filter((game) => (filters.sport === "All sports" || game.sport === filters.sport) && game.distance <= filters.distance && (!filters.openOnly || playerCount(game) < game.maxPlayers))
    .sort((a, b) => filters.sort === "distance" ? a.distance - b.distance : `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`));

  return (
    <main id="main-content" className="page-shell pt-8 sm:pt-10">
      <section className="mb-8 flex items-end justify-between gap-6 sm:mb-9">
        <div><p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-forest"><span className="size-1.5 rounded-full bg-clay" />Local games. Real connections.</p>
          <h1 className="font-heading text-[36px] font-extrabold leading-[1.13] tracking-[-1.8px] sm:text-[46px]">Your next game is<br className="hidden sm:block" /> <span className="text-forest">around the corner.</span></h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">Find a pickup game, meet your people, and get out there.<br className="hidden sm:block" /> A good game is closer than you think.</p>
        </div>
        <div className="mb-1 hidden max-w-[260px] lg:block"><div className="mb-4 flex items-center"><div className="flex -space-x-2">{["AM", "JL", "SR", "MC"].map((initials, index) => <span key={initials} className={`flex size-10 items-center justify-center rounded-full border-[3px] border-background text-[10px] font-bold ${["bg-[#d5ddc8] text-[#536446]", "bg-[#ecd8c9] text-[#8f6249]", "bg-[#d2dee0] text-[#4c7180]", "bg-[#e9dfbb] text-[#8d7541]"][index]}`}>{initials}</span>)}</div><span className="ml-3 flex size-9 items-center justify-center rounded-full border border-line"><MoveUpRight className="size-4" /></span></div><p className="text-sm font-semibold">New teammates. Same love for the game.</p><p className="mt-1.5 text-xs text-muted">Purdue & West Lafayette community</p></div>
      </section>
      <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[1.07fr_1fr] lg:gap-6">
        <div className="order-2 lg:order-1 lg:col-span-2"><FilterBar /></div>
        <div className="order-1 min-w-0 lg:order-2"><MapPanel games={visibleGames} /></div>
        <section aria-labelledby="nearby-heading" className="order-3 min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><h2 id="nearby-heading" className="flex items-center gap-2.5 font-heading text-lg font-extrabold tracking-[-.4px]">Games near you <span className="rounded-md bg-sage px-2 py-1 font-sans text-xs font-semibold text-forest" aria-live="polite" data-testid="game-count">{visibleGames.length}</span></h2>
            <label className="flex items-center gap-1 text-xs text-muted">Sort by<select aria-label="Sort games" value={filters.sort} onChange={(event) => setFilters({ ...filters, sort: event.target.value as Filters["sort"] })} className="min-h-9 bg-transparent font-semibold text-ink"><option value="distance">Nearest first</option><option value="date">Soonest first</option></select></label>
          </div>
          <div className="game-scroll space-y-3 lg:max-h-[596px] lg:overflow-y-auto lg:p-1 lg:pr-2" role="region" aria-label="Nearby game results" tabIndex={0}>
            {visibleGames.length ? visibleGames.map((game) => <GameCard game={game} key={game.id} />) : <div className="flex min-h-[310px] flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white px-6 text-center"><span className="mb-4 rounded-full bg-sage p-4 text-forest"><Search className="size-6" /></span><h3 className="font-heading text-lg font-bold">No games in this corner. Yet.</h3><p className="mt-2 max-w-xs text-sm leading-6 text-muted">Try a different sport or a little more distance to find your next game.</p><button type="button" onClick={() => setFilters(defaultFilters)} className="primary-button mt-5 text-sm">Clear all filters <ArrowUpRight className="size-4" /></button></div>}
          </div>
        </section>
      </div>
      <section aria-label="How OpenCourt works" className="mt-7 flex flex-col justify-between gap-4 rounded-2xl bg-[#edf0e6] px-5 py-5 sm:flex-row sm:items-center sm:px-6">
        <div className="flex items-center gap-3"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/75 text-forest"><Sparkles className="size-5" /></span><div><h2 className="text-sm font-bold">Less planning. More playing.</h2><p className="mt-1 text-xs text-muted">Pick a game, grab an open spot, and show up as you are.</p></div></div><p className="flex items-center gap-2 text-[11px] text-muted"><MapPin className="size-3.5 shrink-0" />Demo games · Sep 22–27, 2026</p>
      </section>
    </main>
  );
}
