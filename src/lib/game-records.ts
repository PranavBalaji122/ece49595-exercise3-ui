import type { Sport } from "@/lib/games";

// Shape of a game as the team's REST API returns it. Field names are
// snake_case to match the planned Python backend and SQL schema, and each
// venue stores real coordinates instead of a hand-placed spot on a drawing.
export interface GameRecord {
  id: string;
  title: string;
  sport: Sport;
  skill_level: "all_levels" | "casual" | "intermediate";
  starts_at: string; // ISO 8601 with the Eastern time offset
  ends_at: string;
  current_players: number;
  max_players: number;
  venue: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    indoor: boolean;
  };
  host: { display_name: string };
  description: string;
  equipment_notes: string;
}

// Fictional demo games at real West Lafayette / Lafayette venues. The backend
// will replace this list; the UI only depends on the GameRecord shape.
export const gameRecords: GameRecord[] = [
  {
    id: "corec-evening-hoops",
    title: "After-class hoops",
    sport: "Basketball",
    skill_level: "all_levels",
    starts_at: "2026-10-20T18:00:00-04:00",
    ends_at: "2026-10-20T19:30:00-04:00",
    current_players: 7,
    max_players: 10,
    venue: {
      name: "CoRec basketball courts",
      address: "355 N Martin Jischke Dr, West Lafayette, IN",
      latitude: 40.4284,
      longitude: -86.9224,
      indoor: true,
    },
    host: { display_name: "Alex Morgan" },
    description:
      "Close the laptop and get a few runs in. We’re playing friendly 5-on-5, rotating teams between games. Come solo or bring a friend — everyone gets court time.",
    equipment_notes:
      "Court shoes, water, and a light and dark shirt. This mock session assumes participants have CoRec access.",
  },
  {
    id: "purdue-doubles",
    title: "A little friendly doubles",
    sport: "Tennis",
    skill_level: "intermediate",
    starts_at: "2026-10-21T17:00:00-04:00",
    ends_at: "2026-10-21T18:30:00-04:00",
    current_players: 3,
    max_players: 4,
    venue: {
      name: "Schwartz Tennis Center",
      address: "McCormick Rd, West Lafayette, IN",
      latitude: 40.4367,
      longitude: -86.9381,
      indoor: false,
    },
    host: { display_name: "Maya Chen" },
    description:
      "Looking for one more for relaxed doubles. We’ll warm up together, switch partners, and play a couple of sets. Some rally experience is helpful; a perfect serve is optional.",
    equipment_notes:
      "Your racket, court shoes, and water. The host will bring balls.",
  },
  {
    id: "tapawingo-volleyball",
    title: "Sunset sets",
    sport: "Volleyball",
    skill_level: "casual",
    starts_at: "2026-10-21T18:30:00-04:00",
    ends_at: "2026-10-21T20:00:00-04:00",
    current_players: 8,
    max_players: 12,
    venue: {
      name: "Tapawingo Park",
      address: "Tapawingo Park, West Lafayette, IN",
      latitude: 40.4206,
      longitude: -86.8987,
      indoor: false,
    },
    host: { display_name: "Jordan Lee" },
    description:
      "Good rallies, a little sunshine, and zero pressure. Join our mixed-skill group for a casual evening of volleyball. We’ll explain rotations if you’re new.",
    equipment_notes:
      "Water, comfortable clothes, and a good attitude. Ball and portable net provided in this demo session.",
  },
  {
    id: "im-soccer",
    title: "The weeknight kickabout",
    sport: "Soccer",
    skill_level: "all_levels",
    starts_at: "2026-10-22T17:30:00-04:00",
    ends_at: "2026-10-22T19:00:00-04:00",
    current_players: 10,
    max_players: 14,
    venue: {
      name: "Purdue intramural fields",
      address: "McCormick Rd, West Lafayette, IN",
      latitude: 40.4406,
      longitude: -86.9369,
      indoor: false,
    },
    host: { display_name: "Sam Rivera" },
    description:
      "A friendly 7-a-side game to break up the week. No fixed teams and no tryouts — we’ll split into balanced sides when everyone arrives.",
    equipment_notes:
      "Cleats or turf shoes, shin guards, water, and a light and dark shirt.",
  },
  {
    id: "happy-hollow-hoops",
    title: "Saturday morning buckets",
    sport: "Basketball",
    skill_level: "casual",
    starts_at: "2026-10-24T10:00:00-04:00",
    ends_at: "2026-10-24T11:30:00-04:00",
    current_players: 5,
    max_players: 10,
    venue: {
      name: "Happy Hollow Park",
      address: "1301 Happy Hollow Rd, West Lafayette, IN",
      latitude: 40.4414,
      longitude: -86.9045,
      indoor: false,
    },
    host: { display_name: "Taylor Brooks" },
    description:
      "Start your Saturday with a low-key outdoor run. We’ll play half-court until enough people arrive for full-court. Beginners are welcome.",
    equipment_notes:
      "Outdoor court shoes, water, and sunscreen. We have a basketball.",
  },
  {
    id: "cumberland-flag",
    title: "Sunday flag football",
    sport: "Flag Football",
    skill_level: "all_levels",
    starts_at: "2026-10-25T14:00:00-04:00",
    ends_at: "2026-10-25T16:00:00-04:00",
    current_players: 9,
    max_players: 14,
    venue: {
      name: "Cumberland Park",
      address: "3101 N Salisbury St, West Lafayette, IN",
      latitude: 40.465,
      longitude: -86.918,
      indoor: false,
    },
    host: { display_name: "Casey Davis" },
    description:
      "A friendly, non-contact 7-on-7 game. We’ll go through the rules before kickoff and rotate positions so everyone gets involved.",
    equipment_notes:
      "Cleats or running shoes and water. Flags and football provided.",
  },
  {
    id: "columbian-tennis",
    title: "Weekend rally club",
    sport: "Tennis",
    skill_level: "intermediate",
    starts_at: "2026-10-24T09:00:00-04:00",
    ends_at: "2026-10-24T10:30:00-04:00",
    current_players: 4,
    max_players: 4,
    venue: {
      name: "Columbian Park tennis courts",
      address: "Columbian Park, Lafayette, IN",
      latitude: 40.4149,
      longitude: -86.871,
      indoor: false,
    },
    host: { display_name: "Riley Patel" },
    description:
      "An easygoing doubles session with longer rallies and rotating partners. This session is currently full; browse the other games for an open spot.",
    equipment_notes: "Racket, court shoes, tennis balls, and water.",
  },
  {
    id: "mccaw-volleyball",
    title: "Sunday serve & social",
    sport: "Volleyball",
    skill_level: "casual",
    starts_at: "2026-10-25T16:00:00-04:00",
    ends_at: "2026-10-25T17:30:00-04:00",
    current_players: 6,
    max_players: 12,
    venue: {
      name: "McCaw Park",
      address: "McCaw Park, Lafayette, IN",
      latitude: 40.4236,
      longitude: -86.8415,
      indoor: false,
    },
    host: { display_name: "Jamie Park" },
    description:
      "Wrap up the weekend with casual volleyball and new friends. All skill levels are welcome, and we’ll rotate everyone through the court.",
    equipment_notes:
      "Water, comfortable shoes, and sunscreen. Portable net and ball provided.",
  },
];

export function findGameRecord(id: string) {
  return gameRecords.find((record) => record.id === id);
}
