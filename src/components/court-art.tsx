import { sportStyles, type Sport } from "@/lib/games";

/** Original vector court illustration, reused on cards and detail banners. */
export function CourtArt({ sport, className = "" }: { sport: Sport; className?: string }) {
  const { surface, ink } = sportStyles[sport];
  return (
    <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <rect width="320" height="220" fill={surface} />
      <g transform="rotate(-22 160 110)" fill="none" stroke={ink} strokeWidth="2" opacity=".7">
        <rect x="45" y="-35" width="230" height="300" rx="2" fill={ink} fillOpacity=".14" />
        <path d="M45 110h230" /><circle cx="160" cy="110" r="30" />
        {sport === "Basketball" ? <><path d="M95-35v60h130v-60M95 265v-60h130v60" /><path d="M65-35a95 110 0 0 0 190 0M65 265a95 110 0 0 1 190 0" /><circle cx="160" cy="25" r="30" /><circle cx="160" cy="205" r="30" /></> : sport === "Tennis" || sport === "Volleyball" ? <><path d="M75-35v300M245-35v300M75 35h170M75 185h170M160 35v150" /><path d="M35 106h250m-250 8h250" strokeWidth="3" /></> : <><path d="M90-35v50h140v-50M90 265v-50h140v50" /><path d="M45 45h230M45 175h230" strokeDasharray={sport === "Flag Football" ? "10 8" : "0"} /></>}
      </g>
      <circle cx="249" cy="148" r="7" fill={ink} opacity=".22" />
      <circle cx="246" cy="144" r="7" fill="#fff9e8" />
      <circle cx="86" cy="78" r="7" fill={ink} opacity=".22" />
      <circle cx="83" cy="74" r="7" fill="#334f42" />
    </svg>
  );
}
