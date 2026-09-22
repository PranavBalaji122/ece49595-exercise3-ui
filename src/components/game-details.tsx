"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3, MapPin, Users, Check, HeartHandshake, Backpack, DoorOpen } from "lucide-react";
import { CourtArt } from "@/components/court-art";
import { SportIcon } from "@/components/sport-icon";
import { MapPanel } from "@/components/map-panel";
import { useGames } from "@/components/game-provider";
import { type Game, sportStyles, formatDate, formatTime } from "@/lib/games";

export function GameDetails({ game }: { game: Game }) {
  const { joinedIds, playerCount, toggleJoin } = useGames();
  const joined = joinedIds.includes(game.id);
  const count = playerCount(game);
  const spots = game.maxPlayers - count;
  const full = spots === 0 && !joined;

  return (
    <main id="main-content" className="page-shell pt-7 sm:pt-9">
      <Link href="/" className="mb-6 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-muted hover:text-forest"><ArrowLeft className="size-4" />Back to Discover</Link>
      <div className="mb-8 flex min-h-[190px] overflow-hidden rounded-2xl bg-forest sm:min-h-[230px]">
        <div className="relative w-[56%] sm:w-2/3"><CourtArt sport={game.sport} className="absolute inset-0 h-full w-full" /><span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-[11px] font-bold text-forest sm:bottom-6 sm:left-6"><SportIcon sport={game.sport} className="size-4" />{game.sport}<span className="font-normal text-muted">· {game.setting}</span></span></div>
        <div className="flex flex-1 flex-col justify-center p-5 text-white sm:p-9"><span className="mb-4 text-[9px] font-semibold uppercase tracking-[.15em] text-[#cee0c9]">Find your people.</span><p className="font-heading text-3xl font-extrabold leading-[1.1] tracking-[-1px] sm:text-[42px]">Show up.<br />Game on.</p><ArrowUpRight className="mt-4 size-6 text-[#cee0c9]" /></div>
      </div>
      <div className="grid items-start gap-7 lg:grid-cols-[1.65fr_1fr] lg:gap-10">
        <div>
          <div className="mb-3 flex items-center gap-2"><span className={`rounded-md px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider ${sportStyles[game.sport].badge}`}>{game.sport}</span><span className="rounded-md bg-white px-2.5 py-1.5 text-[10px] font-semibold text-muted">{game.level}</span></div>
          <h1 className="font-heading text-3xl font-extrabold tracking-[-1px] sm:text-[38px]">{game.title}</h1>
          <p className="mt-3 flex items-center gap-2 text-sm text-muted"><MapPin className="size-4 shrink-0" />{game.location}<span>· {game.distance.toFixed(1)} mi away</span></p>
          <div className="my-7 grid grid-cols-1 gap-5 border-y border-line py-6 sm:grid-cols-2">
            <div className="flex items-start gap-3"><CalendarDays className="mt-0.5 size-5 text-forest" /><div><h2 className="text-[10px] font-bold uppercase tracking-wider text-muted">When</h2><p className="mt-1 text-sm font-semibold">{formatDate(game.date, true)}</p><p className="mt-1 text-xs text-muted">{formatTime(game.time)} – {formatTime(game.endTime)} ET</p></div></div>
            <div className="flex items-start gap-3"><DoorOpen className="mt-0.5 size-5 text-forest" /><div><h2 className="text-[10px] font-bold uppercase tracking-wider text-muted">The game plan</h2><p className="mt-1 text-sm font-semibold">{game.setting} · {game.level}</p><p className="mt-1 text-xs text-muted">Up to {game.maxPlayers} players</p></div></div>
          </div>
          <section><h2 className="font-heading text-lg font-extrabold">A little about the game</h2><p className="mt-3 text-sm leading-7 text-muted">{game.description}</p></section>
          <section className="mt-6 flex gap-3 rounded-xl bg-sage/65 p-5"><Backpack className="mt-0.5 size-5 shrink-0 text-forest" /><div><h2 className="text-sm font-bold">What to bring</h2><p className="mt-1.5 text-xs leading-6 text-muted">{game.bring}</p></div></section>
          <section className="my-7 flex items-center gap-3"><span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#e7dac5] text-sm font-bold text-[#81623f]">{game.initials}</span><div><h2 className="text-sm font-bold">Hosted by {game.host}</h2><p className="mt-1 text-xs text-muted">Your friendly neighborhood teammate · Demo host</p></div></section>
          <section><h2 className="mb-3 font-heading text-lg font-extrabold">Meet you here</h2><p className="mb-4 text-xs leading-6 text-muted">{game.address}<br />{game.distance.toFixed(1)} miles from the Purdue campus reference point.</p><MapPanel games={[game]} compact /></section>
        </div>
        <aside className="order-first lg:sticky lg:top-6 lg:order-none" aria-label="Join this game">
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-7">
            <div className="mb-5 flex items-center justify-between"><h2 className="font-heading text-xl font-extrabold tracking-[-.5px]">{joined ? "See you out there." : full ? "A full house." : "There’s a spot for you."}</h2><span className="rounded-lg bg-sage p-2 text-forest"><Users className="size-5" /></span></div>
            <p className="text-sm text-muted" data-testid="player-count"><strong className="text-ink">{count}</strong> of {game.maxPlayers} players</p>
            <div role="progressbar" aria-label="Game capacity" aria-valuenow={count} aria-valuemin={0} aria-valuemax={game.maxPlayers} className="my-3 h-2 overflow-hidden rounded-full bg-sage"><div className="h-full rounded-full bg-forest transition-all" style={{ width: `${count / game.maxPlayers * 100}%` }} /></div>
            <p className="mb-6 text-xs font-semibold text-forest">{spots === 0 ? "All spots are filled" : `${spots} ${spots === 1 ? "spot" : "spots"} still open`} · {game.level} welcome</p>
            <button type="button" onClick={() => toggleJoin(game.id)} disabled={full} className={`primary-button w-full text-sm ${joined ? "!bg-sage !text-forest hover:!bg-line" : ""}`}>{joined ? "Leave game" : full ? "Game full" : "Join game"}{!full && (joined ? <Check className="size-4" /> : <ArrowUpRight className="size-4" />)}</button>
            <div aria-live="polite" role="status" className="mt-3 text-center text-xs leading-5 text-muted">{joined ? "You’re on the roster! This demo spot is saved until you refresh." : full ? "Try another nearby game with an open spot." : "A demo RSVP. No account or payment needed."}</div>
            {joined && <Link href="/my-games" className="mt-3 flex min-h-9 items-center justify-center gap-1 text-xs font-semibold text-forest">View my games <ArrowUpRight className="size-3.5" /></Link>}
            <div className="mt-5 border-t border-line pt-5"><p className="flex items-center gap-2 text-xs font-semibold"><HeartHandshake className="size-4 text-forest" />Good games start with good sports.</p><p className="mt-2 text-xs leading-6 text-muted">Be welcoming, play fair, and give everyone a chance to join in.</p></div>
          </div>
          <p className="mt-4 flex items-start gap-2 px-2 text-[11px] leading-5 text-muted"><Clock3 className="mt-0.5 size-3.5 shrink-0" />This is a fictional game for a frontend prototype. Joining does not reserve a real court or contact a host.</p>
        </aside>
      </div>
    </main>
  );
}
