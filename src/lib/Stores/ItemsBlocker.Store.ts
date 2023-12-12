import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model";
import type { ItemsBlockerDto } from "$lib/Models/DTO/ItemBlocker.DTO.Model";
import type { Store } from "$lib/Models/Response/Store.Response";
import { ItemsBlockerRepository } from "$lib/Repositories/Implementation/ItemsBlocker.Repository";
import { writable } from "svelte/store";
import { itemStore } from "./Items.Store";
import type { OrderDto } from "$lib/Models/DTO/Order.DTO.Model";
import { ordersStore } from "./Orders.Store";

const itemsBlockerRepository = new ItemsBlockerRepository();

const createItemsBlockerStore = () => {
  const { subscribe, set, update } = writable<Store<ItemsBlockerDto>>();
  return {
    subscribe,
    set: (value: Store<ItemsBlockerDto>) => set(value),
    get: async (id: string) => {
      try {
        if(!id) return;
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
            const itemDto: ItemDto | undefined = (await itemStore.get(
              document.itemId
            )) as ItemDto | undefined;
            const orderDto: OrderDto | undefined = (await ordersStore.get(
              document.orderId
            )) as OrderDto | undefined;
            return Dto.ToItemsBlockerDto(
              document,
              itemDto,
              orderDto
            ) as ItemsBlockerDto;
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
