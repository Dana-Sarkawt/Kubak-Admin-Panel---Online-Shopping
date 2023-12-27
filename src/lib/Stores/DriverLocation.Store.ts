import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { DriverLocationDto } from "$lib/Models/DTO/DriverLocation.DTO.Model";
import type { Store } from "$lib/Models/Response/Store.Response";
import { DriverLocationRepository } from "$lib/Repositories/Implementation/DriverLocation.Repository";
import { writable } from "svelte/store";

const driverLocationRepository = new DriverLocationRepository();

const createDriverLocation = async () => {
  const { subscribe, set, update } = writable<Store<DriverLocationDto>>();

  return {
    subscribe,
    set: (value: Store<DriverLocationDto>) => {
      set(value);
    },
    get: async (driverId: string) => {
      try {
        const document = await driverLocationRepository.getDriverLocation(
          driverId
        );
        if (!document) {
          throw new Error("Driver location not found");
        }

        return document;
      } catch (error) {
        console.log(error);
      }
    },
    getAll: async () => {
      try {
        const documents =
          await driverLocationRepository.getAllDriverLocations();
        const dto: DriverLocationDto[] = documents.documents.map((document) => {
          return Dto.ToDriverLocationDto(document) as DriverLocationDto;
        });
        set({ data: dto, total: documents.total });
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const driverLocation = createDriverLocation();
