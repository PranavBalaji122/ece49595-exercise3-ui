import type { Metadata } from "next";
import { MyGames } from "@/components/my-games";
export const metadata: Metadata = { title: "My games" };
export default function MyGamesPage() {
  return <MyGames />;
}
