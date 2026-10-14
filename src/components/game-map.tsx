"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";
import {
  CircleMarker,
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  ZoomControl,
} from "react-leaflet";
import { LocateFixed, Maximize } from "lucide-react";
import { SportIcon } from "@/components/sport-icon";
import { useGames } from "@/components/game-provider";
import type { Game, Sport } from "@/lib/games";
import type { Coordinates } from "@/lib/geo";

// Leaflet is browser-only, so this file is loaded with next/dynamic and
// ssr: false from MapPanel.

function createPinIcon(sport: Sport, selected: boolean) {
  let pinClass = "game-pin";
  if (selected) {
    pinClass = "game-pin is-selected";
  }
  const iconMarkup = renderToStaticMarkup(
    <SportIcon sport={sport} className="game-pin-icon" />,
  );
  return L.divIcon({
    html: `<span class="${pinClass}">${iconMarkup}</span>`,
    className: "game-pin-wrapper",
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

function GameMarker({
  game,
  selected,
  onSelect,
}: {
  game: Game;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  const markerRef = useRef<L.Marker>(null);
  const icon = useMemo(
    () => createPinIcon(game.sport, selected),
    [game.sport, selected],
  );

  // Leaflet already gives keyboard markers role="button" and tabindex="0".
  // Add an accessible name and the pressed state for screen readers.
  useEffect(() => {
    const element = markerRef.current?.getElement();
    if (!element) return;
    element.setAttribute("aria-label", `Preview ${game.title} on map`);
    element.setAttribute("aria-pressed", String(selected));
  }, [game.title, selected, icon]);

  let zIndexOffset = 0;
  if (selected) {
    zIndexOffset = 1000;
  }

  // Leaflet 1.9 makes markers focusable but does not activate them from the
  // keyboard, so handle Enter and Space like a button would.
  function handleKeyDown(event: L.LeafletKeyboardEvent) {
    const key = event.originalEvent.key;
    if (key === "Enter" || key === " ") {
      event.originalEvent.preventDefault();
      onSelect(game.id);
    }
  }

  return (
    <Marker
      ref={markerRef}
      position={[game.latitude, game.longitude]}
      icon={icon}
      zIndexOffset={zIndexOffset}
      eventHandlers={{
        click: () => onSelect(game.id),
        keydown: handleKeyDown,
      }}
    />
  );
}

function boundsFor(games: Game[], origin: Coordinates) {
  const points: L.LatLngTuple[] = games.map((game) => [
    game.latitude,
    game.longitude,
  ]);
  points.push([origin.latitude, origin.longitude]);
  return L.latLngBounds(points);
}

export function GameMap({
  games,
  selectedId,
  onSelectGame,
  onReset,
  compact,
}: {
  games: Game[];
  selectedId: string | null;
  onSelectGame: (id: string) => void;
  onReset: () => void;
  compact: boolean;
}) {
  const { origin, locationStatus, locateUser } = useGames();
  const [map, setMap] = useState<L.Map | null>(null);
  const hasFitted = useRef(false);

  // Leave room for the label at the top and the preview card at the bottom.
  let fitOptions: L.FitBoundsOptions = {
    paddingTopLeft: [40, 90],
    paddingBottomRight: [70, 120],
    maxZoom: 15,
  };
  if (compact) {
    fitOptions = {
      paddingTopLeft: [50, 100],
      paddingBottomRight: [70, 40],
      maxZoom: 15,
    };
  }

  // Fit the map to the games once they arrive.
  useEffect(() => {
    if (!map || hasFitted.current || games.length === 0) return;
    map.fitBounds(boundsFor(games, origin), fitOptions);
    hasFitted.current = true;
  });

  // Fly to a game when it is selected from a card or a marker.
  const selectedGame = games.find((game) => game.id === selectedId);
  const selectedLatitude = selectedGame?.latitude;
  const selectedLongitude = selectedGame?.longitude;
  useEffect(() => {
    if (!map || compact) return;
    if (selectedLatitude === undefined || selectedLongitude === undefined) {
      return;
    }
    const zoom = Math.max(map.getZoom(), 14);
    map.flyTo([selectedLatitude, selectedLongitude], zoom, { duration: 0.6 });
  }, [map, compact, selectedLatitude, selectedLongitude]);

  // Center on the user once their location is known.
  useEffect(() => {
    if (!map || locationStatus !== "device") return;
    if (compact) {
      // On the details page, keep both the user and the venue in view.
      map.fitBounds(boundsFor(games, origin), {
        paddingTopLeft: [50, 100],
        paddingBottomRight: [70, 40],
      });
      return;
    }
    map.flyTo([origin.latitude, origin.longitude], 14, { duration: 0.8 });
    // games is left out on purpose: re-centering should only follow the user.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, compact, locationStatus, origin.latitude, origin.longitude]);

  function resetView() {
    onReset();
    if (map && games.length > 0) {
      map.fitBounds(boundsFor(games, origin), fitOptions);
    }
  }

  // The user's own marker is always labeled; the campus label only shows on
  // hover so it does not cover the nearby game markers.
  let originLabel = "Purdue campus";
  let originColor = "#648bab";
  let labelAlwaysVisible = false;
  if (locationStatus === "device") {
    originLabel = "You are here";
    originColor = "#2563eb";
    labelAlwaysVisible = true;
  }

  let buttonPosition = "bottom-[150px]";
  if (compact) {
    buttonPosition = "bottom-8";
  }

  return (
    <>
      <div className="absolute inset-0 z-0" id="game-map">
        <MapContainer
          ref={setMap}
          center={[origin.latitude, origin.longitude]}
          zoom={13}
          zoomControl={false}
          zoomSnap={0.25}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />
          <ZoomControl position="topright" />
          <CircleMarker
            center={[origin.latitude, origin.longitude]}
            radius={8}
            pathOptions={{
              color: "#ffffff",
              weight: 3,
              fillColor: originColor,
              fillOpacity: 1,
            }}
          >
            <Tooltip
              key={originLabel}
              permanent={labelAlwaysVisible}
              direction="top"
              offset={[0, -10]}
            >
              {originLabel}
            </Tooltip>
          </CircleMarker>
          {games.map((game) => (
            <GameMarker
              key={game.id}
              game={game}
              selected={game.id === selectedId}
              onSelect={onSelectGame}
            />
          ))}
        </MapContainer>
      </div>
      <div
        className={`absolute right-4 z-10 flex flex-col overflow-hidden rounded-lg border border-line bg-white shadow-sm ${buttonPosition}`}
      >
        <button
          type="button"
          aria-label="Use my location"
          title="Use my location"
          onClick={locateUser}
          className="flex size-10 items-center justify-center border-b border-line text-forest hover:bg-sage"
        >
          <LocateFixed className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Reset map view"
          title="Reset map view"
          onClick={resetView}
          className="flex size-10 items-center justify-center hover:bg-sage"
        >
          <Maximize className="size-4" />
        </button>
      </div>
    </>
  );
}
