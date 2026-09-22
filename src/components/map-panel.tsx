"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Minus,
  Plus,
  Navigation,
  LocateFixed,
  MapPin,
} from "lucide-react";
import { MapArt } from "@/components/map-art";
import { SportIcon } from "@/components/sport-icon";
import { useGames } from "@/components/game-provider";
import { type Game } from "@/lib/games";

export function MapPanel({
  games,
  compact = false,
}: {
  games: Game[];
  compact?: boolean;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const selected = games.find((game) => game.id === selectedId) ?? games[0];
  const { playerCount } = useGames();

  return (
    <section
      aria-label="Map of nearby pickup games"
      data-testid="map-panel"
      className={`relative isolate overflow-hidden rounded-2xl border border-[#d7ddcf] bg-sage ${compact ? "h-[320px]" : "h-[380px] sm:h-[440px] lg:h-[642px]"}`}
    >
      <div
        className="absolute inset-0 transition-transform duration-300"
        style={{ transform: `scale(${zoom})` }}
      >
        <MapArt />
        {games.map((game) => (
          <button
            key={game.id}
            type="button"
            aria-label={`Preview ${game.title} on map`}
            aria-pressed={selected?.id === game.id}
            onClick={() => setSelectedId(game.id)}
            className={`map-pin absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-white transition-colors ${selected?.id === game.id ? "z-10 bg-forest text-white" : "bg-white text-forest hover:bg-sage"}`}
            style={{
              // Reserve space for the label, zoom controls, and preview on narrow screens.
              left: `calc(24px + (100% - 104px) * ${game.position.x / 100})`,
              top: `calc(64px + (100% - ${compact ? 108 : 204}px) * ${game.position.y / 100})`,
            }}
          >
            <SportIcon sport={game.sport} className="size-[22px]" />
          </button>
        ))}
      </div>
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-lg border border-white/80 bg-white/95 px-3 py-2.5 text-[11px] font-semibold shadow-sm">
        <span className="size-1.5 rounded-full bg-forest" />
        Purdue & the neighborhood
      </div>
      <div
        className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-white/90 text-forest shadow-sm"
        aria-label="North"
      >
        <Navigation className="size-4 -rotate-45" />
        <span className="absolute -top-2 text-[9px] font-bold">N</span>
      </div>
      <div className="absolute bottom-[148px] right-4 flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm">
        <button
          type="button"
          aria-label="Zoom in"
          disabled={zoom >= 1.5}
          onClick={() => setZoom((value) => Math.min(1.5, value + 0.25))}
          className="flex size-10 items-center justify-center border-b border-line hover:bg-sage disabled:opacity-35"
        >
          <Plus className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          disabled={zoom <= 1}
          onClick={() => setZoom((value) => Math.max(1, value - 0.25))}
          className="flex size-10 items-center justify-center border-b border-line hover:bg-sage disabled:opacity-35"
        >
          <Minus className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Reset map view"
          onClick={() => {
            setZoom(1);
            setSelectedId(null);
          }}
          className="flex size-10 items-center justify-center hover:bg-sage"
        >
          <LocateFixed className="size-4" />
        </button>
      </div>
      {!compact && (
        <div className="absolute inset-x-4 bottom-10" aria-live="polite">
          {selected ? (
            <Link
              href={`/games/${selected.id}`}
              className="flex items-center gap-3 rounded-xl border border-white bg-white/95 p-3.5 shadow-[0_4px_20px_#253b3210] sm:p-4"
              aria-label={`View details for ${selected.title}`}
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sage text-forest">
                <SportIcon sport={selected.sport} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{selected.title}</p>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-muted">
                  <MapPin className="size-3" />
                  <span className="truncate">{selected.location}</span>
                  <span className="shrink-0">
                    · {selected.maxPlayers - playerCount(selected)} open
                  </span>
                </p>
              </div>
              <ArrowUpRight className="size-5 shrink-0 text-forest" />
            </Link>
          ) : (
            <p className="rounded-xl bg-white/95 p-4 text-center text-sm text-muted">
              No games match these filters.
            </p>
          )}
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[#eef0e6]/95 px-4 py-2.5 text-[10px] text-[#5e6e5f]">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#648bab]" />
          Purdue campus reference
        </span>
        <span>Illustrative map · not to scale</span>
      </div>
    </section>
  );
}
