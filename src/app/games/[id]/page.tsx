import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GameDetails } from "@/components/game-details";
import { findGameRecord, gameRecords } from "@/lib/game-records";

export function generateStaticParams() {
  return gameRecords.map((record) => ({ id: record.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const record = findGameRecord(id);
  return { title: record?.title ?? "Game not found" };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = findGameRecord(id);
  if (!record) notFound();
  return <GameDetails record={record} />;
}
