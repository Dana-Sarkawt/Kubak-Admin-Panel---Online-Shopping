import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { DriverLocationDto } from "$lib/Models/DTO/DriverLocation.DTO.Model";
import type { Store } from "$lib/Models/Response/Store.Response";
import { DriverLocationRepository } from "$lib/Repositories/Implementation/DriverLocation.Repository";
import { writable } from "svelte/store";
import { errorStore } from "./Errors.Store";
import { HttpError } from "$lib/Errors/HttpErrors.Error";
import { Errors } from "$lib/Models/Enums/Errors.Enum.Model";
import { toastStore } from "./Toast.Store";
import { ToastMessages } from "$lib/Models/Enums/Toast-Messages.Enum.Model";

const driverLocationRepository = new DriverLocationRepository();

const createDriverLocationStore = () => {
  const { subscribe, set, update } = writable<Store<DriverLocationDto>>();

  return {
    subscribe,
    set: (value: Store<DriverLocationDto>) => {
      set(value);
    },
    get: async (id: string) => {
      errorStore.clear();
      try {
        const document = await driverLocationRepository.getDriverLocation(id);
        if (!document) {
          throw new HttpError(Errors.NotFound,"Driver location not found");
        }

        return document;
      } catch (error) {
        if (error instanceof HttpError) errorStore.add(error.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
    getAll: async () => {
      errorStore.clear();
      try {
        const { documents , total} =
          await driverLocationRepository.getAllDriverLocations();
        const dto: DriverLocationDto[] = documents.map((document) => {
          return Dto.ToDriverLocationDto(document) as DriverLocationDto;
        });
        set({ data: dto, total });
      } catch (error) {
        toastStore.set(ToastMessages.WARNING);
      }
    }
  };
};

export const driverLocationStore = createDriverLocationStore();
