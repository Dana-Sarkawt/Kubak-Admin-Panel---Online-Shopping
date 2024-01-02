import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { DriverLocationDto } from "$lib/Models/DTO/DriverLocation.DTO.Model";
import type { Store } from "$lib/Models/Response/Store.Response";
import { DriverLocationRepository } from "$lib/Repositories/Implementation/DriverLocation.Repository";
import { writable } from "svelte/store";

const driverLocationRepository = new DriverLocationRepository();

const createDriverLocationStore = () => {
  const { subscribe, set, update } = writable<Store<DriverLocationDto>>();

  return {
    subscribe,
    set: (value: Store<DriverLocationDto>) => {
      set(value);
    },
    get: async (id: string) => {
      try {
        const document = await driverLocationRepository.getDriverLocation(id);
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
        const { documents , total} =
          await driverLocationRepository.getAllDriverLocations();
        const dto: DriverLocationDto[] = documents.map((document) => {
          return Dto.ToDriverLocationDto(document) as DriverLocationDto;
        });
        set({ data: dto, total });
      } catch (error) {
        console.log(error);
      }
    },
    getDriverLocationByDriverId: async (driverId: string) => {
      try {
        const document =
          await driverLocationRepository.getDriverLocationByDriverId(driverId);

        if (!document) {
          throw new Error("Driver location not found");
        }
        const dto = Dto.ToDriverLocationDto(document);

        return dto;
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const driverLocationStore = createDriverLocationStore();
