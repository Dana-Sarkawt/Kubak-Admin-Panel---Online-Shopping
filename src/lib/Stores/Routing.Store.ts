import { Environment } from "$lib/Env/Environment";
import type { Direction, LngLat } from "$lib/Models/Common/LngLat.Common.Model";
import type { ValhallaRoute } from "$lib/Models/Entities/Valhalla-Trip.Entity.Model";
import type { CreateValhallaRoutingRequest } from "$lib/Models/Requests/CreateValhallaRouting.Request.Model";
import { writable } from "svelte/store";
import { decodeFromPolyline6 } from "../../utils/ValhallaShapeDecode.Utils";

const createRoutingStore = () => {
  const { subscribe, set, update } = writable<Direction[]>();
  return {
    subscribe,
    set: (value: Direction[]) => set(value),
    create: async (
      source: LngLat,
      destination: LngLat,
      excludePolygon?: number,
      heading?: number
    ) => {
      try {
        let baseUrl = Environment.valhalla_endpoint;
        let url = `/route?json=`;

        let requestJson: CreateValhallaRoutingRequest = {
          locations: [
            {
              lat: source.lat,
              lon: source.lng,
              heading: heading ?? 0,
            },
            {
              lat: destination.lat,
              lon: destination.lng,
            },
          ],
          costing: "motorcycle",
          units: "km",
          excludePolygon: excludePolygon ? [excludePolygon] : undefined,
        };

        let json: string = JSON.stringify(requestJson);
        url = url.concat(json);

        console.log(url);

        let requestUrl: string = baseUrl + url;

        const response = await fetch(requestUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response) {
          throw new Error("No Response Was Found");
        }

        const route: ValhallaRoute = JSON.parse(await response.text()).trip;

        let directions: Direction[] = route.legs.map((leg) => {
          return {
            route: leg.shape,
            distance: leg.summary.length * 1000,
            duration: leg.summary.time,
          };
        });

        directions[0].routeLngLat = decodeFromPolyline6(
          directions[0].route as string
        );

        set(directions);
      } catch (error) {
        console.error(error);
      }
    },
  };
};

export const routingStore = createRoutingStore();
