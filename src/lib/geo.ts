export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Purdue Memorial Union. Used for distances until the user shares a location.
export const campusLocation: Coordinates = {
  latitude: 40.4247,
  longitude: -86.9113,
};

const earthRadiusMiles = 3958.8;

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

// Great-circle (haversine) distance between two points, in miles.
export function distanceInMiles(from: Coordinates, to: Coordinates) {
  const latitudeChange = toRadians(to.latitude - from.latitude);
  const longitudeChange = toRadians(to.longitude - from.longitude);
  const fromLatitude = toRadians(from.latitude);
  const toLatitude = toRadians(to.latitude);

  const a =
    Math.sin(latitudeChange / 2) ** 2 +
    Math.cos(fromLatitude) *
      Math.cos(toLatitude) *
      Math.sin(longitudeChange / 2) ** 2;
  const centralAngle = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadiusMiles * centralAngle;
}
