import type { LngLat } from "$lib/Models/Common/LngLat.Common.Model";

export function decodeFromPolyline6(encodedPoints: string): LngLat[] {
  let index = 0;
  let lat = 0.0;
  let lng = 0.0;
  const coordinates: LngLat[] = [];
  const factor = Math.pow(10, 6);

  while (index < encodedPoints.length) {
    let byteVal;
    let shift = 0;
    let result = 0;

    do {
      byteVal = encodedPoints.charCodeAt(index++) - 63;
      result |= (byteVal & 0x1f) << shift;
      shift += 5;
    } while (byteVal >= 0x20);

    const latitudeChange = result & 1 ? ~(result >> 1) : result >> 1;

    shift = result = 0;

    do {
      byteVal = encodedPoints.charCodeAt(index++) - 63;
      result |= (byteVal & 0x1f) << shift;
      shift += 5;
    } while (byteVal >= 0x20);

    const longitudeChange = result & 1 ? ~(result >> 1) : result >> 1;

    lat += latitudeChange;
    lng += longitudeChange;

    coordinates.push({ lng: lng / factor, lat: lat / factor });
  }

  console.log("Coordinates",coordinates[0]);
  

  return coordinates;
}
