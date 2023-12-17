import { Environment } from "$lib/Env/Environment";
import { writable } from "svelte/store";

const createMapTileLayersStore = () => {
  const { subscribe, set, update } = writable<{ url: string; name: string }>({
    url: `https://api.mapbox.com/styles/v1/mapbox/${Environment.mapbox_style_streets}/tiles/{z}/{x}/{y}?access_token=${Environment.mapbox_access_token}`,
    name: Environment.mapbox_style_streets,
  });
  return {
    subscribe,
    set: (value: string) => {
      switch (value) {
        case Environment.mapbox_style_dark:
          set({
            url: `https://api.mapbox.com/styles/v1/mapbox/${Environment.mapbox_style_dark}/tiles/{z}/{x}/{y}?access_token=${Environment.mapbox_access_token}`,
            name: Environment.mapbox_style_dark,
          });
          break;
        case Environment.mapbox_style_satellite_streets:
          set({
            url: `https://api.mapbox.com/styles/v1/mapbox/${Environment.mapbox_style_satellite_streets}/tiles/{z}/{x}/{y}?access_token=${Environment.mapbox_access_token}`,
            name: Environment.mapbox_style_satellite_streets,
          });
          break;
        default:
          set({
            url: `https://api.mapbox.com/styles/v1/mapbox/${Environment.mapbox_style_streets}/tiles/{z}/{x}/{y}?access_token=${Environment.mapbox_access_token}`,
            name: Environment.mapbox_style_streets,
          });
          break;
      }
    },
  };
};

export const mapTileLayersStore = createMapTileLayersStore();
