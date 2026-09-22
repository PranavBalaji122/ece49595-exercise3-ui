import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GameDetails } from "@/components/game-details";
import { games } from "@/lib/games";

export function generateStaticParams() {
  return games.map((game) => ({ id: game.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const game = games.find((game) => game.id === id);
  return { title: game?.title ?? "Game not found" };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = games.find((game) => game.id === id);
  if (!game) notFound();
  return <GameDetails game={game} />;
}
