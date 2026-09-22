export const sports = ["Basketball", "Soccer", "Volleyball", "Tennis", "Flag Football"] as const;
export type Sport = (typeof sports)[number];
export type SportFilter = Sport | "All sports";

export interface Game {
  id: string;
  title: string;
  sport: Sport;
  location: string;
  address: string;
  distance: number;
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
  position: { x: number; y: number };
}

// Fixed, fictional fixtures make the assignment reproducible. Distances and map
// positions are illustrative, relative to the Purdue campus, not live GPS data.
export const games: Game[] = [
  {
    id: "corec-evening-hoops", title: "After-class hoops", sport: "Basketball",
    location: "CoRec basketball courts", address: "355 N Martin Jischke Dr, West Lafayette, IN",
    distance: 0.4, date: "2026-09-22", time: "18:00", endTime: "19:30", players: 7, maxPlayers: 10,
    level: "All levels", host: "Alex Morgan", initials: "AM", setting: "Indoor", position: { x: 36, y: 45 },
    description: "Close the laptop and get a few runs in. We’re playing friendly 5-on-5, rotating teams between games. Come solo or bring a friend — everyone gets court time.",
    bring: "Court shoes, water, and a light and dark shirt. This mock session assumes participants have CoRec access.",
  },
  {
    id: "purdue-doubles", title: "A little friendly doubles", sport: "Tennis",
    location: "Schwartz Tennis Center", address: "1324 McCormick Rd, West Lafayette, IN",
    distance: 0.8, date: "2026-09-23", time: "17:00", endTime: "18:30", players: 3, maxPlayers: 4,
    level: "Intermediate", host: "Maya Chen", initials: "MC", setting: "Outdoor", position: { x: 21, y: 27 },
    description: "Looking for one more for relaxed doubles. We’ll warm up together, switch partners, and play a couple of sets. Some rally experience is helpful; a perfect serve is optional.",
    bring: "Your racket, court shoes, and water. The host will bring balls.",
  },
  {
    id: "hilles-volleyball", title: "Sunset sets", sport: "Volleyball",
    location: "Hilles Park", address: "Hilles Park, West Lafayette, IN",
    distance: 1.2, date: "2026-09-23", time: "18:30", endTime: "20:00", players: 8, maxPlayers: 12,
    level: "Casual", host: "Jordan Lee", initials: "JL", setting: "Outdoor", position: { x: 61, y: 24 },
    description: "Good rallies, a little sunshine, and zero pressure. Join our mixed-skill group for a casual evening of volleyball. We’ll explain rotations if you’re new.",
    bring: "Water, comfortable clothes, and a good attitude. Ball and portable net provided in this demo session.",
  },
  {
    id: "im-soccer", title: "The weeknight kickabout", sport: "Soccer",
    location: "Purdue intramural fields", address: "Purdue intramural fields, West Lafayette, IN",
    distance: 1.8, date: "2026-09-24", time: "17:30", endTime: "19:00", players: 10, maxPlayers: 14,
    level: "All levels", host: "Sam Rivera", initials: "SR", setting: "Outdoor", position: { x: 22, y: 68 },
    description: "A friendly 7-a-side game to break up the week. No fixed teams and no tryouts — we’ll split into balanced sides when everyone arrives.",
    bring: "Cleats or turf shoes, shin guards, water, and a light and dark shirt.",
  },
  {
    id: "happy-hollow-hoops", title: "Saturday morning buckets", sport: "Basketball",
    location: "Happy Hollow Park", address: "1301 Happy Hollow Rd, West Lafayette, IN",
    distance: 2.4, date: "2026-09-26", time: "10:00", endTime: "11:30", players: 5, maxPlayers: 10,
    level: "Casual", host: "Taylor Brooks", initials: "TB", setting: "Outdoor", position: { x: 68, y: 44 },
    description: "Start your Saturday with a low-key outdoor run. We’ll play half-court until enough people arrive for full-court. Beginners are welcome.",
    bring: "Outdoor court shoes, water, and sunscreen. We have a basketball.",
  },
  {
    id: "cumberland-flag", title: "Sunday flag football", sport: "Flag Football",
    location: "Cumberland Park", address: "3101 N Salisbury St, West Lafayette, IN",
    distance: 3.2, date: "2026-09-27", time: "14:00", endTime: "16:00", players: 9, maxPlayers: 14,
    level: "All levels", host: "Casey Davis", initials: "CD", setting: "Outdoor", position: { x: 46, y: 12 },
    description: "A friendly, non-contact 7-on-7 game. We’ll go through the rules before kickoff and rotate positions so everyone gets involved.",
    bring: "Cleats or running shoes and water. Flags and football provided.",
  },
  {
    id: "clegg-tennis", title: "Weekend rally club", sport: "Tennis",
    location: "Lafayette community courts", address: "Lafayette, IN",
    distance: 4.1, date: "2026-09-26", time: "09:00", endTime: "10:30", players: 4, maxPlayers: 4,
    level: "Intermediate", host: "Riley Patel", initials: "RP", setting: "Outdoor", position: { x: 85, y: 68 },
    description: "An easygoing doubles session with longer rallies and rotating partners. This session is currently full; browse the other games for an open spot.",
    bring: "Racket, court shoes, tennis balls, and water.",
  },
  {
    id: "lafayette-volleyball", title: "Sunday serve & social", sport: "Volleyball",
    location: "Lafayette community fields", address: "Lafayette, IN",
    distance: 5.6, date: "2026-09-27", time: "16:00", endTime: "17:30", players: 6, maxPlayers: 12,
    level: "Casual", host: "Jamie Park", initials: "JP", setting: "Outdoor", position: { x: 77, y: 86 },
    description: "Wrap up the weekend with casual volleyball and new friends. All skill levels are welcome, and we’ll rotate everyone through the court.",
    bring: "Water, comfortable shoes, and sunscreen. Portable net and ball provided.",
  },
];

export const sportStyles: Record<Sport, { badge: string; surface: string; ink: string }> = {
  Basketball: { badge: "bg-orange-50 text-orange-800", surface: "#ead2b4", ink: "#a8643c" },
  Soccer: { badge: "bg-emerald-50 text-emerald-800", surface: "#c9d9bb", ink: "#617c50" },
  Volleyball: { badge: "bg-amber-50 text-amber-800", surface: "#eee1b9", ink: "#a78a43" },
  Tennis: { badge: "bg-lime-50 text-lime-800", surface: "#cddbbe", ink: "#738359" },
  "Flag Football": { badge: "bg-sky-50 text-sky-800", surface: "#cbdce0", ink: "#527d8c" },
};

export function formatDate(date: string, long = false) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: long ? "long" : "short", month: long ? "long" : "short", day: "numeric", timeZone: "UTC",
    ...(long ? { year: "numeric" as const } : {}),
  }).format(new Date(`${date}T12:00:00Z`));
}

export function formatTime(time: string) {
  const [hour, minute] = time.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
}
