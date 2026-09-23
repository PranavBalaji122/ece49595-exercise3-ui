# PickupSports demo recording

A corrected PickupSports video has not yet been recorded. The previous recording visibly used outdated branding and has been withdrawn from the current submission. Do not submit a renamed copy of that recording.

## Short recording sequence

Aim for about 40–60 seconds so the build result and interactions remain readable. Use a clean editor window and an incognito browser with no unrelated tabs. Record just those windows and hide notifications.

1. Start in the editor. Expand `src/app`, `src/components`, and `src/lib`. Briefly open `navbar.tsx`, `game-card.tsx`, `filter-bar.tsx`, `map-panel.tsx`, `discover-explorer.tsx`, and `game-details.tsx` (8–12 seconds).
2. Open the integrated terminal in the repository and type `npm run build`. Wait until the successful build summary appears (usually 4–8 seconds here; do not cut off a slower build).
3. Type `npm run dev`. Show the Local URL and Ready message (3–5 seconds). If an older dev server occupies port 3000, stop it first or use the Local URL printed by this server.
4. Open that Local URL in the browser. Show the PickupSports header and Discover page with All sports / Within 10 miles: 8 games (3 seconds).
5. Click Basketball: 2 games. Select Distance → Within 2 miles: 1 game, After-class hoops (5–7 seconds).
6. Click After-class hoops, show Game Details, then click Back to Discover (5–7 seconds).
7. Open Chrome DevTools with Option–Command–I, toggle device mode with Shift–Command–M, select Responsive, set width to 390, and scroll through the stacked map, filters, and cards (6–10 seconds).
8. Stop recording. Export a real MP4 named `ECE49595_Exercise3_PickupSports_Final.mp4`; changing a MOV extension alone does not convert it.

Terminal commands, from the repository folder:

```bash
npm run build
npm run dev
```

Optional spoken script: “This is PickupSports. The UI is split into reusable components. The production build succeeds, and the development server is ready. Discover lists eight games. Basketball shows two, and a two-mile radius leaves one. This is its details page. Back to Discover preserves the filters. At 390 pixels, the layout stacks for mobile.”

After recording, review for readable build output, correct branding, successful launch, both filters, details/back navigation, and mobile layout. Upload only the corrected final MP4 to this folder, verify its public GitHub URL, and then add that verified URL to README and the Word document. No corrected video URL exists yet.
