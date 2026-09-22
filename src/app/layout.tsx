import type { Metadata } from "next";
import { GameProvider } from "@/components/game-provider";
import { Navbar, Footer } from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OpenCourt — Find your next game",
    template: "%s | OpenCourt",
  },
  description:
    "Find your people. Find your game. A pickup sports discovery prototype around Purdue and West Lafayette.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <GameProvider>
          <a
            href="#main-content"
            className="sr-only z-50 rounded-lg bg-forest p-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <Navbar />
          {children}
          <Footer />
        </GameProvider>
      </body>
    </html>
  );
}
