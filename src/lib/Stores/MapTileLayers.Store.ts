import { Environment } from "$lib/Env/Environment";
import { writable } from "svelte/store";

const createMapTileLayersStore = () => {
  const { subscribe, set, update } = writable<string>(
    `https://api.mapbox.com/styles/v1/mapbox/${Environment.mapbox_style_streets}/tiles/{z}/{x}/{y}?access_token=${Environment.mapbox_access_token}`
  );
  return {
    subscribe,
    set: (value: string) => {
      switch (value) {
        case Environment.mapbox_style_dark:
          set(
            `https://api.mapbox.com/styles/v1/mapbox/${Environment.mapbox_style_dark}/tiles/{z}/{x}/{y}?access_token=${Environment.mapbox_access_token}`
          );
          break;
        case Environment.mapbox_style_satellite_streets:
          set(
            `https://api.mapbox.com/styles/v1/mapbox/${Environment.mapbox_style_satellite_streets}/tiles/{z}/{x}/{y}?access_token=${Environment.mapbox_access_token}`
          );
          break;
        default:
          set(
            `https://api.mapbox.com/styles/v1/mapbox/${Environment.mapbox_style_streets}/tiles/{z}/{x}/{y}?access_token=${Environment.mapbox_access_token}`
          );
          break;
      }
    },
  };
};

export const mapTileLayersStore = createMapTileLayersStore();
