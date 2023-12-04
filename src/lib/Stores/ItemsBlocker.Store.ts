import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { ItemsBlockerDto } from "$lib/Models/DTO/ItemBlocker.DTO.Model";
import type { Store } from "$lib/Models/Response/Store.Response";
import { ItemsBlockerRepository } from "$lib/Repositories/Implementation/ItemsBlocker.Repository";
import { writable } from "svelte/store";

const itemsBlockerRepository = new ItemsBlockerRepository();

const createItemsBlockerStore = () => {
  const { subscribe, set, update } = writable<Store<ItemsBlockerDto>>();
  return {
    subscribe,
    set: (value: Store<ItemsBlockerDto>) => set(value),
    get: async (id: string) => {
      try {
        let document = await itemsBlockerRepository.get(id);
        return Dto.ToItemsBlockerDto(document);
      } catch (error) {
        console.log(error);
      }
    },
    getAll: async (orderId?: string) => {
      try {
        let { documents, total } = await itemsBlockerRepository.getAll(orderId);
        let itemsBlockerDto: ItemsBlockerDto[] = await Promise.all(
          documents.map(async (document) => {
            return Dto.ToItemsBlockerDto(document) as ItemsBlockerDto;
          })
        );

        const pages = Math.ceil(total / 8);

        set({ data: itemsBlockerDto, total: total, pages: pages });

        return itemsBlockerDto;
      } catch (error) {
        console.log(error);
      }
    },
    delete: async (id: string) => {
      try {
        await itemsBlockerRepository.delete(id);
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const itemsBlockerStore = createItemsBlockerStore();
