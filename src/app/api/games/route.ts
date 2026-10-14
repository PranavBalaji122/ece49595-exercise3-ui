import { gameRecords } from "@/lib/game-records";

// GET /api/games
// Stand-in for the team's REST endpoint. It returns games in the same
// project format the backend will use, so the UI does not change when the
// real service replaces this file.
export function GET() {
  return Response.json({ games: gameRecords });
}
