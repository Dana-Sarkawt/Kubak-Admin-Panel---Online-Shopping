import { goto } from "$app/navigation";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { OrderDto } from "$lib/Models/DTO/Order.DTO.Model";
import type { CreateOrderRequest } from "$lib/Models/Requests/CreateOrder.Request";
import type { Store } from "$lib/Models/Response/Store.Response";
import { OrdersRepository } from "$lib/Repositories/Implementation/Orders.Repository";
import { writable } from "svelte/store";
import { authStore } from "./Auth.Store";
import type { AuthDto } from "$lib/Models/DTO/Auth.DTO.Model";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { itemStore } from "./Items.Store";
import { addressStore } from "./Address.Store";
import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model";
import type { AddressDto } from "$lib/Models/DTO/Address.DTO.Model";

const ordersRepository = new OrdersRepository();

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
        if (!id) return;
        let document = await ordersRepository.getOrder(id);
        return Dto.ToOrderDto(document);
      } catch (error) {
        console.log(error);
      }
    },
    getAll: async (options?: GenericListOptions) => {
      try {
        let { documents, total } = await ordersRepository.getOrders(options);
        let ordersDto: OrderDto[] = await Promise.all(
          documents.map(async (document) => {
            const userDto: AuthDto | undefined | null =
              (await authStore.getUser(document.userId)) as
                | AuthDto
                | undefined
                | null;
            const itemsDto: ItemDto[] = await Promise.all(
              document.itemIds.map(async (itemId) => {
                const itemDto = await itemStore.get(itemId);
                return itemDto;
              }) as Promise<ItemDto>[]
            );
            const addressDto: AddressDto | null | undefined =
              (await addressStore.get(document.addressId)) as
                | AddressDto
                | null
                | undefined;
            return Dto.ToOrderDto(
              document,
              userDto,
              itemsDto,
              addressDto
            ) as OrderDto;
          })
        );

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
        if (order.addressId == "") {
          throw new Error("Address is required");
        }
        await ordersRepository.createOrder(order);
        goto("/monitoring");
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
