"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight, MapPin, MousePointerClick } from "lucide-react";
import { SportIcon } from "@/components/sport-icon";
import { describeOrigin, useGames } from "@/components/game-provider";
import { type Game } from "@/lib/games";

// Leaflet needs `window`, so the map only renders in the browser.
const GameMap = dynamic(
  () => import("@/components/game-map").then((module) => module.GameMap),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-sage" />,
  },
);

function doNothing() {}

export function MapPanel({
  games,
  selectedId = null,
  onSelectGame = doNothing,
  onReset = doNothing,
  compact = false,
}: {
  games: Game[];
  selectedId?: string | null;
  onSelectGame?: (id: string) => void;
  onReset?: () => void;
  compact?: boolean;
}) {
  const { playerCount, locationStatus, gamesLoaded } = useGames();
  const selected = games.find((game) => game.id === selectedId);

  let heightClass = "h-[380px] sm:h-[440px] lg:h-[642px]";
  if (compact) {
    heightClass = "h-[320px]";
  }

  return (
    <section
      aria-label="Map of nearby pickup games"
      data-testid="map-panel"
      className={`relative isolate overflow-hidden rounded-2xl border border-[#d7ddcf] bg-sage ${heightClass}`}
    >
      <GameMap
        games={games}
        selectedId={selectedId}
        onSelectGame={onSelectGame}
        onReset={onReset}
        compact={compact}
      />
      <div className="pointer-events-none absolute left-4 top-4 z-10 flex max-w-[calc(100%-80px)] flex-col gap-1.5">
        <p className="flex w-fit items-center gap-2 rounded-lg border border-white/80 bg-white/95 px-3 py-2.5 text-[11px] font-semibold shadow-sm">
          <span className="size-1.5 rounded-full bg-forest" />
          Purdue & the neighborhood
        </p>
        <p
          role="status"
          data-testid="location-status"
          className="w-fit rounded-lg bg-white/95 px-3 py-1.5 text-[11px] text-muted shadow-sm"
        >
          {describeOrigin(locationStatus)}
        </p>
      </div>
      {!compact && (
        <div className="absolute inset-x-4 bottom-8 z-10" aria-live="polite">
          {selected && (
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
                    · {selected.distance.toFixed(1)} mi ·{" "}
                    {selected.maxPlayers - playerCount(selected)} open
                  </span>
                </p>
              </div>
              <ArrowUpRight className="size-5 shrink-0 text-forest" />
            </Link>
          )}
          {!selected && games.length > 0 && (
            <p className="flex items-center justify-center gap-2 rounded-xl bg-white/95 p-4 text-center text-sm text-muted">
              <MousePointerClick className="size-4 shrink-0" />
              Pick a marker or a game card to preview it here.
            </p>
          )}
          {!selected && games.length === 0 && gamesLoaded && (
            <p className="rounded-xl bg-white/95 p-4 text-center text-sm text-muted">
              No games match these filters.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
