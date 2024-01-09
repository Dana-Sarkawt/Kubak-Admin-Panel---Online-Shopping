import { HttpError } from "$lib/Errors/HttpErrors.Error";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { OrderStatusDto } from "$lib/Models/DTO/OrderStatus.DTO.Model";
import { Errors } from "$lib/Models/Enums/Errors.Enum.Model";
import type { CreateOrderStatusRequest } from "$lib/Models/Requests/CreateOrderStatus.Request.Model";
import type { Store } from "$lib/Models/Response/Store.Response";
import { OrderStatusRepository } from "$lib/Repositories/Implementation/OrderStatus.Repository";
import { writable } from "svelte/store";
import { errorStore } from "./Errors.Store";
import { toastStore } from "./Toast.Store";
import { ToastMessages } from "$lib/Models/Enums/Toast-Messages.Enum.Model";

const orderStatusRepository = new OrderStatusRepository();

const createOrderStatusStore = () => {
  const { subscribe, set, update } = writable<Store<OrderStatusDto>>();

  return {
    subscribe,
    set: (value: Store<OrderStatusDto>) => set(value),
    create: async (orderStatus: CreateOrderStatusRequest) => {
      try {
        if (!orderStatus.driverId) {
          throw new HttpError(Errors.BadRequest, "DriverId is required");
        }
        if (!orderStatus.orderId) {
          throw new HttpError(Errors.BadRequest, "OrderId is required");
        }
        if (!orderStatus.destination) {
          throw new HttpError(Errors.BadRequest, "Destination is required");
        }
        await orderStatusRepository.createOrderStatus(orderStatus);
      } catch (error) {
        if (error instanceof HttpError) errorStore.add(error.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
    get: async (id: string) => {
      try {
        const orderStatus = await orderStatusRepository.getOrderStatus(id);
        if (!orderStatus) {
          throw new HttpError(Errors.NotFound, "OrderStatus not found");
        }
        const orderStatusDto = Dto.ToOrderStatusDto(orderStatus);
        return orderStatusDto;
      } catch (error) {
        if (error instanceof HttpError) errorStore.add(error.response());
        toastStore.set(ToastMessages.WARNING);
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
        toastStore.set(ToastMessages.WARNING);
      }
    },
    getOrderStatusByOrderId: async (orderId: string) => {
      try {
        const orderStatus = await orderStatusRepository.getOrderStatusByOrderId(
          orderId
        );
        if (!orderStatus) {
          throw new HttpError(Errors.NotFound, "OrderStatus Not Found");
        }
        const orderStatusDto = Dto.ToOrderStatusDto(orderStatus);
        return orderStatusDto;
      } catch (error) {
        if (error instanceof HttpError) errorStore.add(error.response());
        toastStore.set(ToastMessages.WARNING);
        return null;
      }
    },
    getOrderStatusByDriverId: async (driverId: string) => {
      try {
        const orderStatus =
          await orderStatusRepository.getOrderStatusByDriverId(driverId);
        if (!orderStatus) {
          throw new HttpError(Errors.NotFound, "OrderStatus Not Found");
        }
        const orderStatusDto = Dto.ToOrderStatusDto(orderStatus);
        return orderStatusDto;
      } catch (error) {
        if (error instanceof HttpError) errorStore.add(error.response());
        toastStore.set(ToastMessages.WARNING);
        return null;
      }
    },
    update: async (orderStatus: CreateOrderStatusRequest) => {
      try {
        const document = await orderStatusRepository.getOrderStatus(
          orderStatus.id!
        );
        if (!document) {
          throw new HttpError(Errors.NotFound, "OrderStatus not found");
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
        if (error instanceof HttpError) errorStore.add(error.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
    delete: async (id: string) => {
      try {
        const document = await orderStatusRepository.getOrderStatus(id);
        if (!document) {
          throw new HttpError(Errors.NotFound,"OrderStatus not found");
        }
        await orderStatusRepository.deleteOrderStatus(id);
      } catch (error) {
        if (error instanceof HttpError) errorStore.add(error.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
  };
};

export const orderStatusStore = createOrderStatusStore();
