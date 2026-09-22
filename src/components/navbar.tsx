"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, ArrowUpRight } from "lucide-react";
import { useGames } from "@/components/game-provider";

export function Brand({ light = false }: { light?: boolean }) {
  return <span className={`inline-flex items-center gap-2.5 text-[23px] font-extrabold tracking-[-1.2px] ${light ? "text-white" : "text-forest"}`}>
    <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="2" y="2" width="28" height="28" rx="8" stroke="currentColor" strokeWidth="2" /><path d="M2 16h28M16 2v28" stroke="currentColor" strokeWidth="1.4" /><circle cx="16" cy="16" r="7" stroke="currentColor" strokeWidth="1.4" /></svg>
    opencourt<span className="-ml-2 text-clay">.</span>
  </span>;
}

export function Navbar() {
  const pathname = usePathname();
  const { joinedIds } = useGames();
  return (
    <header className="border-b border-line bg-white">
      <div className="page-shell flex min-h-20 flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4 sm:py-0">
        <Link href="/" aria-label="OpenCourt home"><Brand /></Link>
        <nav aria-label="Main navigation" className="order-3 flex w-full gap-7 self-stretch sm:order-none sm:w-auto sm:gap-9">
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={`nav-link ${pathname === "/" || pathname.startsWith("/games/") ? "nav-active" : ""}`}>Discover</Link>
          <Link href="/my-games" aria-current={pathname === "/my-games" ? "page" : undefined} className={`nav-link ${pathname === "/my-games" ? "nav-active" : ""}`}>My games{joinedIds.length > 0 && <span className="ml-1.5 rounded-full bg-sage px-1.5 py-0.5 text-xs text-forest">{joinedIds.length}</span>}</Link>
        </nav>
        <span className="flex items-center gap-2 text-xs font-medium text-muted sm:text-sm"><MapPin className="size-4 text-forest" /><span className="hidden min-[400px]:inline">West Lafayette, IN</span><span className="min-[400px]:hidden">West Lafayette</span></span>
      </div>
    </header>
  );
}

export function Footer() {
  return <footer className="page-shell mt-12 flex flex-col justify-between gap-3 border-t border-line py-6 text-xs text-muted sm:flex-row"><p>Made for a little less scrolling, a little more playing.</p><p className="flex items-center gap-1.5">OpenCourt · ECE 49595 UI prototype <ArrowUpRight className="size-3" /></p></footer>;
}
