# Verification results

Verified on September 22, 2026, using Node.js 24.10.0, Next.js 16.3.6, React 19.2.8, TypeScript, Tailwind CSS 4, and Google Chrome through Playwright.

| Check                   | Result                                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Dependency installation | Installed successfully; npm audit reported 0 vulnerabilities at installation                                        |
| Development server      | Started at `http://127.0.0.1:3000`; starter and finished Discover UI loaded                                         |
| `npm run build`         | Passed with the default Turbopack production build; 13 static outputs generated, including all 8 game detail routes |
| `npm run lint`          | Passed                                                                                                              |
| `npm run typecheck`     | Passed (`next typegen` and `tsc --noEmit`)                                                                          |
| `npm run format:check`  | Passed                                                                                                              |
| `npm run test:e2e`      | 20 passed across desktop and mobile Chromium projects                                                               |
| `git diff --check`      | Passed                                                                                                              |

## Browser coverage

The 10 scenarios below run at both desktop and mobile sizes:

1. Discover loads all eight cards and eight map markers without browser exceptions.
2. Basketball filters to two cards; adding a two-mile distance leaves one. Details, Back to Discover, and browser back preserve the selected filters.
3. Distance alone shows four games within two miles. An empty sport/distance combination shows the reset state and zero markers; reset restores all eight games.
4. Open spots hides the full game; chronological sorting changes card order correctly.
5. Joining the last tennis spot changes the count from 3/4 to 4/4. My games includes it. Leaving restores 3/4 and the empty My games view. An already full game cannot be joined.
6. Every map marker is clickable. Selection updates the preview; preview navigation and bounded zoom/reset controls work.
7. Sport buttons work with a keyboard, and an unknown game URL returns a usable 404 page with navigation back.
8. Desktop uses a map/list split; mobile places the map above filters and cards. Discover and details have no horizontal overflow, including an additional 320-pixel check.
9. Discover, details, and My games have no detected violations under axe WCAG 2 A/AA and WCAG 2.1 A/AA rules. Automated checks are not a complete accessibility audit.
10. Desktop Discover, active filters, details, and mobile Discover screenshots are captured.

The production suite used an isolated Chrome profile with a 1440 × 1000 desktop viewport and Playwright's iPhone 13 viewport. A separate visual inspection used a 390 × 844 viewport. The development page and captured desktop, detail, filter, and mobile images were visually inspected.

## Issues resolved during verification

- Reserved map space for labels, zoom buttons, and the selected-game preview to prevent phone-width controls from covering markers.
- Darkened muted copy and avatar initials to pass text contrast checks.
- Waited for the details URL before testing browser back, so the test reflects a completed navigation.
- Cleared a failed local Turbopack cache after a restricted-process error. The final unmodified `npm run build` succeeded; no bundler workaround is required in the project.

## Reproduce

```bash
npm ci
npm run lint
npm run typecheck
npm run format:check
npm run build
npm run test:e2e
```

Google Chrome must be installed for the configured browser channel. See the README for using bundled Chromium instead. No application credentials or environment variables are needed.
