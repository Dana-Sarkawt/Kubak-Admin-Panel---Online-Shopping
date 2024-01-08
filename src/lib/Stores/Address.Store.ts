import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { AddressDto } from "$lib/Models/DTO/Address.DTO.Model";
import type { Store } from "$lib/Models/Response/Store.Response";
import { AddressRepository } from "$lib/Repositories/Implementation/Address.Repository";
import { writable } from "svelte/store";
import { errorStore } from "./Errors.Store";
import { HttpError } from "$lib/Errors/HttpErrors.Error";
import { Errors } from "$lib/Models/Enums/Errors.Enum.Model";
import { toastStore } from "./Toast.Store";
import { ToastMessages } from "$lib/Models/Enums/Toast-Messages.Enum.Model";

const addressRepository = new AddressRepository();

const createAddressStore = () => {
  const { subscribe, set, update } = writable<Store<AddressDto>>();
  return {
    subscribe,
    set: (value: Store<AddressDto>) => set(value),
    get: async (id?: string) => {
      errorStore.clear();
      try {
        if (!id) {
          throw new HttpError(Errors.NotFound, "Id is Required");
        }
        let document = await addressRepository.getAddress(id);
        return Dto.ToAddressDto(document);
      } catch (error) {
        if (error instanceof HttpError) errorStore.add(error.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
    getAll: async (options?: GenericListOptions) => {
      errorStore.clear();
      try {
        let { documents, total } = await addressRepository.getAddresses();
        let addressDto: AddressDto[] = await Promise.all(
          documents.map(async (document) => {
            return Dto.ToAddressDto(document) as AddressDto;
          })
        );

        const pages = Math.ceil(total / (options?.limit ?? 8));

        set({ data: addressDto, total: total, pages: pages });

        return addressDto;
      } catch (error) {
        toastStore.set(ToastMessages.WARNING);
      }
    },
    delete: async (id: string) => {
      errorStore.clear();
      try {
        const address = await addressRepository.getAddress(id);
        if (!address) {
          throw new HttpError(Errors.NotFound, "Address Not Found");
        }
        await addressRepository.deleteAddress(id);
      } catch (error) {
        toastStore.set(ToastMessages.WARNING);
      }
    },
  };
};

export const addressStore = createAddressStore();
