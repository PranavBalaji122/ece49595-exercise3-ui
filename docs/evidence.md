# Assignment screenshot evidence

Use the captions below directly in the assignment document. Keep the public repository URL next to the screenshots. All five PickupSports screenshots are captured in `docs/screenshots/`, including the actual project structure in the code editor.

## Screenshot 1 — Project/component file structure

**Ready-made image:** [01-component-structure.png](screenshots/01-component-structure.png)

**Take:** Open the project folder in VS Code or another editor. Expand `src/app`, `src/app/games/[id]`, `src/components`, and `src/lib` in the Explorer. Show `Navbar`, `GameCard`, `FilterBar`, and `MapPanel` filenames; collapse `node_modules` and `.next`. Optionally open `discover-explorer.tsx` alongside the tree to show component composition.

**Paste-ready caption:** “The project uses separate reusable React components for navigation, game cards, filters, and the map. Next.js routes, typed mock game data, and shared UI state are organized into dedicated files.”

## Screenshot 2 — Main Discover page

**Take:** Run `npm run dev`, open `http://localhost:3000`, and use a desktop browser width of about 1440 pixels. Set All sports and Within 10 miles, leave Open spots only unchecked, and capture the page with the map and game cards side by side. A full-page capture includes all visible sections.

**Ready-made image:** [02-discover-desktop.png](screenshots/02-discover-desktop.png)

**Paste-ready caption:** “The Discover page combines a neighborhood map, pickup game cards, and filter controls in a responsive desktop layout. Each game card presents the sport, location, distance, schedule, and available player capacity.”

## Screenshot 3 — Active filtering

**Take:** Select Basketball and Within 2 miles. The result counter should change from 8 to 1, leaving After-class hoops and its single map marker. Include the selected controls and filtered result in the screenshot.

**Ready-made image:** [03-active-filters.png](screenshots/03-active-filters.png)

**Paste-ready caption:** “Selecting Basketball and a two-mile radius updates the displayed games using React state. Both the game list and map use the same filtered data, leaving only the nearby basketball game that matches both conditions.”

## Screenshot 4 — Game Details page

**Take:** Open After-class hoops from its card. Capture the title, date/time, location, player count, Join game button, and Back to Discover control. You may take a second screenshot after clicking Join game to show the updated roster.

**Ready-made image:** [04-game-details.png](screenshots/04-game-details.png)

**Paste-ready caption:** “The Game Details route displays the selected game's schedule, location, player capacity, and joining control. Next.js navigation connects it to Discover, while the join interaction updates shared React state across the application.”

## Screenshot 5 — Mobile/responsive layout

**Take:** In browser developer tools, select a mobile viewport about 390 pixels wide. On Discover, select Basketball to shorten the list, then take a full-page screenshot showing the map above the filters and game cards. The included image uses the mobile Chromium test profile.

**Ready-made image:** [05-discover-mobile.png](screenshots/05-discover-mobile.png)

**Paste-ready caption:** “At phone width, the desktop columns reorganize into a vertical map, filter, and game-list layout. Tailwind responsive utilities also adjust navigation, card artwork, spacing, and control wrapping so the interface remains usable on a small screen.”

## Final submission reminders

- Include the public GitHub repository URL.
- Use the five regenerated PickupSports screenshots.
- Complete any required non-coding reflection in your own words, describing what you understand and learned; this repository supplies the coding prototype and technical evidence.
- These are demo games and an illustrative map, not live pickup events.
