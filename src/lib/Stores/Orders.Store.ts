import { goto } from "$app/navigation";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { OrderDto } from "$lib/Models/DTO/Order.DTO.Model";
import type { Item } from "$lib/Models/Entities/Item.Entities.Model";
import type { CreateOrderRequest } from "$lib/Models/Requests/CreateOrder.Request";
import type { Store } from "$lib/Models/Response/Store.Response";
import { ItemsRepository } from "$lib/Repositories/Implementation/Items.Repository";
import { OrdersRepository } from "$lib/Repositories/Implementation/Orders.Repository";
import { writable } from "svelte/store";

const ordersRepository = new OrdersRepository();
const itemsRepository = new ItemsRepository();

const createOrdersStore = () => {
  const { subscribe, set, update } = writable<Store<OrderDto>>({
    data: [],
    total: 0,
  });

  return {
    subscribe,
    set: (value: Store<OrderDto>) => set(value),
    get: async (id: string) => {
      try {
        let document = await ordersRepository.getOrder(id);
        return Dto.ToOrderDto(document);
      } catch (error) {
        console.log(error);
      }
    },
    getAll: async () => {
      try {
        let { documents, total } = await ordersRepository.getOrders();
        let ordersDto: OrderDto[] = documents.map((document) => {
          return Dto.ToOrderDto(document) as OrderDto;
        });

        const pages = Math.ceil(total / 8);

        set({ data: ordersDto, total: total, pages: pages });
      } catch (error) {
        console.log(error);
      }
    },
    create: async (order: CreateOrderRequest) => {
      try {
        if (order.items.length == 0) {
          throw new Error("Order Items is required");
        }
        const items: Item[] = await Promise.all(
          order.items.map((item) => {
            return itemsRepository.getItem(item.itemId);
          })
        );
        await ordersRepository.createOrder(order);
        goto("/orders");
      } catch (error) {
        console.log(error);
      }
    },
    update: async (order: CreateOrderRequest) => {
      try {
        const document = await ordersRepository.getOrder(order.id as string);
        if (document === null) {
          throw new Error("Order Not Found");
        }
        if (order.items.length !== 0) {
          const existingItems = document.items;
          const updatedItems = order.items.filter((newItem) => {
            const existingItem = existingItems.find(
              (item) => item.$id === newItem.itemId
            );
            return !existingItem || existingItem.quantity !== newItem.quantity;
          });
          if (updatedItems.length !== 0) {
            // Items have changed
            // Update the items inside the order
            document.items = await itemsRepository.getItemsByIds(updatedItems);
            return updatedItems;
          } else {
            // Items have not changed
            // Return the items that are already inside the order
            return existingItems;
          }
        }
        await ordersRepository.updateOrder(document);
      } catch (error) {
        console.log(error);
      }
    },
    delete: async (id: string) => {
      try {
        const document = await ordersRepository.getOrder(id);
        if (document === null) {
          throw new Error("Order Not Found");
        }
        document.deletedAt = new Date();
        await ordersRepository.updateOrder(document);
        ordersStore.getAll();
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const ordersStore = createOrdersStore();
