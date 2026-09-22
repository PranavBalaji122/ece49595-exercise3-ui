"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays, MapPin, Users } from "lucide-react";
import { CourtArt } from "@/components/court-art";
import { useGames } from "@/components/game-provider";
import { formatDate, formatTime, sportStyles, type Game } from "@/lib/games";

export function GameCard({ game }: { game: Game }) {
  const { playerCount, joinedIds } = useGames();
  const count = playerCount(game);
  const spots = game.maxPlayers - count;
  const joined = joinedIds.includes(game.id);
  return (
    <article
      data-testid="game-card"
      data-sport={game.sport}
      data-distance={game.distance}
      className="group rounded-2xl border border-line bg-white transition hover:border-forest/40 hover:shadow-sm"
    >
      <Link
        href={`/games/${game.id}`}
        aria-label={`View ${game.title}`}
        className="block rounded-2xl p-4 sm:p-5"
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
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 text-xs">
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
          <span
            className={`flex items-center gap-1 font-semibold ${spots > 0 || joined ? "text-forest" : "text-muted"}`}
          >
            {joined
              ? "You’re in"
              : spots === 0
                ? "Game full"
                : `${spots} spots open`}
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </article>
  );
}
