"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toGame, type Game, type SportFilter } from "@/lib/games";
import type { GameRecord } from "@/lib/game-records";
import { campusLocation, type Coordinates } from "@/lib/geo";

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

// "campus" means distances are measured from Purdue Memorial Union.
export type LocationStatus =
  "campus" | "locating" | "device" | "denied" | "unsupported";

export function describeOrigin(status: LocationStatus) {
  if (status === "device") return "Distances from your location";
  if (status === "locating") return "Finding your location…";
  if (status === "denied") {
    return "Location unavailable · distances from campus";
  }
  if (status === "unsupported") {
    return "Location not supported · distances from campus";
  }
  return "Distances from Purdue Memorial Union";
}

interface GameContextValue {
  games: Game[];
  gamesLoaded: boolean;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  joinedIds: string[];
  toggleJoin: (id: string) => void;
  playerCount: (game: Game) => number;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  origin: Coordinates;
  locationStatus: LocationStatus;
  locateUser: () => void;
}
const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<GameRecord[]>([]);
  const [gamesLoaded, setGamesLoaded] = useState(false);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [joinedIds, setJoinedIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [origin, setOrigin] = useState<Coordinates>(campusLocation);
  const [locationStatus, setLocationStatus] =
    useState<LocationStatus>("campus");

  // Load games once from the API. The provider sits in the root layout, so
  // the list survives client-side navigation between pages.
  useEffect(() => {
    let cancelled = false;
    async function loadGames() {
      const response = await fetch("/api/games");
      const data: { games: GameRecord[] } = await response.json();
      if (!cancelled) {
        setRecords(data.games);
        setGamesLoaded(true);
      }
    }
    loadGames();
    return () => {
      cancelled = true;
    };
  }, []);

  // Distances are recalculated whenever the origin changes.
  const games = records.map((record) => toGame(record, origin));

  function locateUser() {
    if (!("geolocation" in navigator)) {
      setLocationStatus("unsupported");
      return;
    }
    setLocationStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setOrigin({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationStatus("device");
      },
      () => {
        // Permission denied or no fix: keep measuring from campus.
        setOrigin(campusLocation);
        setLocationStatus("denied");
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 },
    );
  }

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
        games,
        gamesLoaded,
        filters,
        setFilters,
        joinedIds,
        toggleJoin,
        playerCount: (game) =>
          game.players + Number(joinedIds.includes(game.id)),
        selectedId,
        setSelectedId,
        origin,
        locationStatus,
        locateUser,
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
