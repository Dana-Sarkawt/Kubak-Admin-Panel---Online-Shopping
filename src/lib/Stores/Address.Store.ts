import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { AddressDto } from "$lib/Models/DTO/Address.DTO.Model";
import type { Store } from "$lib/Models/Response/Store.Response";
import { AddressRepository } from "$lib/Repositories/Implementation/Address.Repository";
import { writable } from "svelte/store";

const addressRepository = new AddressRepository();

const createAddressStore = () => {
  const { subscribe, set, update } = writable<Store<AddressDto>>();
  return {
    subscribe,
    set: (value: Store<AddressDto>) => set(value),
    get: async (id: string) => {
      try {
        if(!id) return;
        let document = await addressRepository.getAddress(id);
        return Dto.ToAddressDto(document);
      } catch (error) {
        console.log(error);
      }
    },
    getAll: async (options?: GenericListOptions) => {
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
        console.log(error);
      }
    },
    delete: async (id: string) => {
      try {
        const address = await addressRepository.getAddress(id);
        if (!address) {
          throw new Error("Address Not Found");
        }
        await addressRepository.deleteAddress(id);
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const addressStore = createAddressStore();
