import type { GameRecord } from "@/lib/game-records";
import { distanceInMiles, type Coordinates } from "@/lib/geo";

export const sports = [
  "Basketball",
  "Soccer",
  "Volleyball",
  "Tennis",
  "Flag Football",
] as const;
export type Sport = (typeof sports)[number];
export type SportFilter = Sport | "All sports";

// The view model the UI components render. It is built from a GameRecord, so
// the components never depend on the API's field names directly.
export interface Game {
  id: string;
  title: string;
  sport: Sport;
  location: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number; // miles from the current origin (user or campus)
  date: string;
  time: string;
  endTime: string;
  players: number;
  maxPlayers: number;
  level: "All levels" | "Casual" | "Intermediate";
  host: string;
  initials: string;
  description: string;
  bring: string;
  setting: "Indoor" | "Outdoor";
}

const levelLabels: Record<GameRecord["skill_level"], Game["level"]> = {
  all_levels: "All levels",
  casual: "Casual",
  intermediate: "Intermediate",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function toGame(record: GameRecord, origin: Coordinates): Game {
  let setting: Game["setting"] = "Outdoor";
  if (record.venue.indoor) {
    setting = "Indoor";
  }
  const distance = distanceInMiles(origin, record.venue);

  return {
    id: record.id,
    title: record.title,
    sport: record.sport,
    location: record.venue.name,
    address: record.venue.address,
    latitude: record.venue.latitude,
    longitude: record.venue.longitude,
    // Round to one decimal so the filter and the card agree on the same value.
    distance: Math.round(distance * 10) / 10,
    // starts_at looks like "2026-10-20T18:00:00-04:00" (local Eastern time).
    date: record.starts_at.slice(0, 10),
    time: record.starts_at.slice(11, 16),
    endTime: record.ends_at.slice(11, 16),
    players: record.current_players,
    maxPlayers: record.max_players,
    level: levelLabels[record.skill_level],
    host: record.host.display_name,
    initials: getInitials(record.host.display_name),
    description: record.description,
    bring: record.equipment_notes,
    setting,
  };
}

export const sportStyles: Record<
  Sport,
  { badge: string; surface: string; ink: string }
> = {
  Basketball: {
    badge: "bg-orange-50 text-orange-800",
    surface: "#ead2b4",
    ink: "#a8643c",
  },
  Soccer: {
    badge: "bg-emerald-50 text-emerald-800",
    surface: "#c9d9bb",
    ink: "#617c50",
  },
  Volleyball: {
    badge: "bg-amber-50 text-amber-800",
    surface: "#eee1b9",
    ink: "#a78a43",
  },
  Tennis: {
    badge: "bg-lime-50 text-lime-800",
    surface: "#cddbbe",
    ink: "#738359",
  },
  "Flag Football": {
    badge: "bg-sky-50 text-sky-800",
    surface: "#cbdce0",
    ink: "#527d8c",
  },
};

export function formatDate(date: string, long = false) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: long ? "long" : "short",
    month: long ? "long" : "short",
    day: "numeric",
    timeZone: "UTC",
    ...(long ? { year: "numeric" as const } : {}),
  }).format(new Date(`${date}T12:00:00Z`));
}

export function formatTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
}
