import type { Sport } from "@/lib/games";

export function SportIcon({
  sport,
  className = "size-5",
}: {
  sport?: Sport;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {!sport ? (
        <>
          <rect x="3" y="3" width="7" height="7" rx="2" />
          <rect x="14" y="3" width="7" height="7" rx="2" />
          <rect x="3" y="14" width="7" height="7" rx="2" />
          <rect x="14" y="14" width="7" height="7" rx="2" />
        </>
      ) : sport === "Flag Football" ? (
        <>
          <ellipse
            cx="12"
            cy="12"
            rx="11"
            ry="7"
            transform="rotate(-40 12 12)"
          />
          <path d="m8 16 8-8M9 11l4 4m-2-6 4 4" />
        </>
      ) : (
        <>
          <circle cx="12" cy="12" r="9" />
          {sport === "Basketball" && (
            <>
              <path d="M3 12h18M12 3v18M5.5 5.5c7 4 6 9 13 13M18.5 5.5c-7 4-6 9-13 13" />
            </>
          )}
          {sport === "Tennis" && (
            <>
              <path d="M7 4c6 4 6 12 0 16M17 4c-6 4-6 12 0 16" />
            </>
          )}
          {sport === "Soccer" && (
            <>
              <path d="m12 7 5 4-2 6H9l-2-6 5-4Zm0 0V3m5 8 4-2m-6 8 3 3M9 17l-3 3m1-9L3 9" />
            </>
          )}
          {sport === "Volleyball" && (
            <>
              <path d="M12 3c-3 4-3 7 0 9m0 0c5-1 8-3 8-5m-8 5c1 5 3 7 5 7M4 8c1 6 5 10 11 12M7 4c2 2 6 3 12 3M3 14c3 0 5-2 6-5" />
            </>
          )}
        </>
      )}
    </svg>
  );
}
