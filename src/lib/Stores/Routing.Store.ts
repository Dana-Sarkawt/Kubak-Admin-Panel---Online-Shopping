import { Environment } from "$lib/Env/Environment";
import type { LngLat } from "$lib/Models/Common/LngLat.Common.Model";
import type { CreateValhallaRoutingRequest } from "$lib/Models/Requests/CreateValhallaRouting.Request";
import { writable } from "svelte/store";

const createRoutingStore = () => {
  const { subscribe, set, update } = writable<CreateValhallaRoutingRequest>();
  return {
    subscribe,
    set: (value: CreateValhallaRoutingRequest) => set(value),
    create:async (
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

        let json:string =  JSON.stringify(requestJson);
        url = url.concat(json);

        console.log(url);
        

        let requestUrl:string = baseUrl + url;

        const response = await fetch(requestUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if(!response){
          throw new Error("No Response Was Found");
        }

        console.log("Route Calculation ",JSON.parse(await response.text()));
      } catch (error) {
        console.error(error);
      }
    },
  };
};

export const routingStore = createRoutingStore();
