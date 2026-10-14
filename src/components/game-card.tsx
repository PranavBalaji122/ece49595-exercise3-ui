"use client";

import Link from "next/link";
import { CalendarDays, LocateFixed, MapPin, Users } from "lucide-react";
import { CourtArt } from "@/components/court-art";
import { useGames } from "@/components/game-provider";
import { formatDate, formatTime, sportStyles, type Game } from "@/lib/games";

function spotsLabel(spots: number, joined: boolean) {
  if (joined) return "You’re in";
  if (spots === 0) return "Game full";
  if (spots === 1) return "1 spot open";
  return `${spots} spots open`;
}

export function GameCard({
  game,
  selected = false,
  onShowOnMap,
}: {
  game: Game;
  selected?: boolean;
  // Only passed on Discover, where there is a map to sync with.
  onShowOnMap?: (id: string) => void;
}) {
  const { playerCount, joinedIds } = useGames();
  const count = playerCount(game);
  const spots = game.maxPlayers - count;
  const joined = joinedIds.includes(game.id);

  let borderClass = "border-line hover:border-forest/40";
  if (selected) {
    borderClass = "border-forest ring-2 ring-forest/25";
  }

  return (
    <article
      id={`game-card-${game.id}`}
      data-testid="game-card"
      data-sport={game.sport}
      data-distance={game.distance}
      data-selected={selected}
      className={`group relative scroll-mt-4 rounded-2xl border bg-white transition hover:shadow-sm ${borderClass}`}
    >
      <Link
        href={`/games/${game.id}`}
        aria-label={`View ${game.title}`}
        className="block rounded-t-2xl p-4 pb-3 sm:p-5 sm:pb-4"
      >
        <div className="flex gap-4">
          <div className="hidden w-[104px] shrink-0 overflow-hidden rounded-xl min-[430px]:block">
            <CourtArt sport={game.sport} className="h-full min-h-32 w-full" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span
                className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[.07em] ${sportStyles[game.sport].badge}`}
              >
                {game.sport}
              </span>
              <span className="text-xs text-muted">
                {game.distance.toFixed(1)} mi
              </span>
            </div>
            <h3 className="mb-2 font-heading text-base font-extrabold tracking-[-.4px] text-ink sm:text-lg">
              {game.title}
            </h3>
            <p className="flex items-center gap-1.5 text-xs text-muted">
              <MapPin className="size-3.5 shrink-0" />
              {game.location}
            </p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
              <CalendarDays className="size-3.5 shrink-0" />
              {formatDate(game.date)}
              <span aria-hidden="true">·</span>
              {formatTime(game.time)}
            </p>
          </div>
        </div>
      </Link>
      <div className="mx-4 flex flex-wrap items-center justify-between gap-2 border-t border-line py-3 text-xs sm:mx-5">
        <span className="flex items-center gap-2 text-muted">
          <Users className="size-3.5" />
          <span>
            <strong className="font-semibold text-ink">
              {count}/{game.maxPlayers}
            </strong>{" "}
            players
          </span>
          <span className="text-line">|</span>
          {game.level}
        </span>
        <span className="flex items-center gap-3">
          <span
            className={`flex items-center gap-1 font-semibold ${spots > 0 || joined ? "text-forest" : "text-muted"}`}
          >
            {spotsLabel(spots, joined)}
          </span>
          {onShowOnMap && (
            <button
              type="button"
              onClick={() => onShowOnMap(game.id)}
              aria-pressed={selected}
              aria-label={`Show on map: ${game.title}`}
              className="flex min-h-8 items-center gap-1.5 rounded-lg bg-sage px-2.5 text-[11px] font-semibold text-forest hover:bg-line"
            >
              <LocateFixed className="size-3.5" />
              Show on map
            </button>
          )}
        </span>
      </div>
    </article>
  );
}
