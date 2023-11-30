import { goto } from "$app/navigation";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { OrderDto } from "$lib/Models/DTO/Order.DTO.Model";
import type { CreateOrderRequest } from "$lib/Models/Requests/CreateOrder.Request";
import type { Store } from "$lib/Models/Response/Store.Response";
import { OrdersRepository } from "$lib/Repositories/Implementation/Orders.Repository";
import { writable } from "svelte/store";

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
