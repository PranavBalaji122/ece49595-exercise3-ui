"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { games, type Game, type SportFilter } from "@/lib/games";

export interface Filters {
  sport: SportFilter;
  distance: number;
  openOnly: boolean;
  sort: "distance" | "date";
}
export const defaultFilters: Filters = {
  sport: "All sports",
  distance: 10,
  openOnly: false,
  sort: "distance",
};

interface GameContextValue {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  joinedIds: string[];
  toggleJoin: (id: string) => void;
  playerCount: (game: Game) => number;
}
const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [joinedIds, setJoinedIds] = useState<string[]>([]);

  function toggleJoin(id: string) {
    const game = games.find((entry) => entry.id === id);
    if (!game) return;
    setJoinedIds((current) => {
      if (current.includes(id)) return current.filter((entry) => entry !== id);
      // Enforce capacity even if the action is called outside the button UI.
      return game.players < game.maxPlayers ? [...current, id] : current;
    });
  }

  return (
    <GameContext.Provider
      value={{
        filters,
        setFilters,
        joinedIds,
        toggleJoin,
        playerCount: (game) =>
          game.players + Number(joinedIds.includes(game.id)),
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGames() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGames must be used inside GameProvider");
  return context;
}
