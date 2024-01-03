import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { OrderStatusDto } from "$lib/Models/DTO/OrderStatus.DTO.Model";
import type { CreateOrderStatusRequest } from "$lib/Models/Requests/CreateOrderStatus.Request.Model";
import type { Store } from "$lib/Models/Response/Store.Response";
import { OrderStatusRepository } from "$lib/Repositories/Implementation/OrderStatus.Repository";
import { writable } from "svelte/store";

const orderStatusRepository = new OrderStatusRepository();

const createOrderStatusStore = () => {
  const { subscribe, set, update } = writable<Store<OrderStatusDto>>();

  return {
    subscribe,
    set: (value: Store<OrderStatusDto>) => set(value),
    create: async (orderStatus: CreateOrderStatusRequest) => {
      try {
        if (!orderStatus.driverId) {
          throw new Error("DriverId is required");
        }
        if (!orderStatus.orderId) {
          throw new Error("OrderId is required");
        }
        if (!orderStatus.destination) {
          throw new Error("Destination is required");
        }
        await orderStatusRepository.createOrderStatus(orderStatus);
      } catch (error) {
        console.log(error);
      }
    },
    get: async (id: string) => {
      try {
        const orderStatus = await orderStatusRepository.getOrderStatus(id);
        if (!orderStatus) {
          throw new Error("OrderStatus not found");
        }
        const orderStatusDto = Dto.ToOrderStatusDto(orderStatus);
        return orderStatusDto;
      } catch (error) {
        console.log(error);
      }
    },
    getAll: async (options?: GenericListOptions) => {
      try {
        const { documents, total } =
          await orderStatusRepository.getOrderStatuses(options);
        const orderStatusesDto: OrderStatusDto[] = documents.map(
          (orderStatus) => {
            return Dto.ToOrderStatusDto(orderStatus) as OrderStatusDto;
          }
        );

        set({ data: orderStatusesDto, total });
      } catch (error) {
        console.log(error);
      }
    },
    getOrderStatusByOrderId: async (orderId: string) => {
      try {
        const orderStatus = await orderStatusRepository.getOrderStatusByOrderId(
          orderId
        );
        if (!orderStatus) {
          console.error("OrderStatus Not Found");
          return null;
        }
        const orderStatusDto = Dto.ToOrderStatusDto(orderStatus);
        return orderStatusDto;
      } catch (error) {
        console.log(error);
      }
    },
    getOrderStatusByDriverId: async (driverId: string) => {
      try {
        const orderStatus =
          await orderStatusRepository.getOrderStatusByDriverId(driverId);
        if (!orderStatus) {
          console.error("OrderStatus Not Found");
          return null;
        }
        const orderStatusDto = Dto.ToOrderStatusDto(orderStatus);
        return orderStatusDto;
      } catch (error) {
        console.log(error);
      }
    },
    update: async ( orderStatus: CreateOrderStatusRequest) => {
      try {
        const document = await orderStatusRepository.getOrderStatus(orderStatus.id!);
        if (!document) {
          throw new Error("OrderStatus not found");
        }
        if (orderStatus.driverId == "") {
          orderStatus.driverId = document.driverId;
        }
        if (orderStatus.orderId == "") {
          orderStatus.orderId = document.orderId;
        }
        if (orderStatus.destination == "") {
          orderStatus.destination = document.destination;
        }
        await orderStatusRepository.updateOrderStatus(orderStatus);
      } catch (error) {
        console.log(error);
      }
    },
    delete: async (id: string) => {
      try {
        const document = await orderStatusRepository.getOrderStatus(id);
        if (!document) {
          throw new Error("OrderStatus not found");
        }
        await orderStatusRepository.deleteOrderStatus(id);
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const orderStatusStore = createOrderStatusStore();
