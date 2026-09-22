"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { useGames } from "@/components/game-provider";
import { GameCard } from "@/components/game-card";
import { games } from "@/lib/games";

export function MyGames() {
  const { joinedIds } = useGames();
  const joinedGames = games.filter((game) => joinedIds.includes(game.id));
  return (
    <main id="main-content" className="page-shell min-h-[65vh] pt-10">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[.18em] text-forest">
        Make time for a good game
      </p>
      <h1 className="font-heading text-4xl font-extrabold tracking-[-1.5px]">
        Your next time out.
      </h1>
      <p className="mb-8 mt-4 text-sm text-muted">
        Your joined demo games. These stay with you as you browse and reset on
        refresh.
      </p>
      {joinedGames.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {joinedGames.map((game) => (
            <GameCard game={game} key={game.id} />
          ))}
        </div>
      ) : (
        <section className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white p-6 text-center">
          <span className="mb-5 rounded-full bg-sage p-4 text-forest">
            <CalendarDays className="size-7" />
          </span>
          <h2 className="font-heading text-xl font-extrabold">
            Your game plan starts here.
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
            Find a game that feels like you and grab an open spot. We’ll keep
            your lineup right here.
          </p>
          <Link href="/" className="primary-button mt-6 text-sm">
            Find a game <ArrowUpRight className="size-4" />
          </Link>
        </section>
      )}
    </main>
  );
}
