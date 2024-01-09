import { ItemsRepository } from "$lib/Repositories/Implementation/Items.Repository";
import type { Store } from "$lib/Models/Response/Store.Response";
import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { CreateItemRequest } from "$lib/Models/Requests/CreateItem.Request.Model";
import { ImageToUrl } from "../../utils/ImageToUrl.Utils";
import { writable } from "svelte/store";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { goto } from "$app/navigation";
import { toastStore } from "./Toast.Store";
import { ToastMessages } from "$lib/Models/Enums/Toast-Messages.Enum.Model";
import { HttpError } from "$lib/Errors/HttpErrors.Error";
import { Errors } from "$lib/Models/Enums/Errors.Enum.Model";
import { errorStore } from "./Errors.Store";

const itemsRepository = new ItemsRepository();

const createItemStore = () => {
  const { subscribe, set, update } = writable<Store<ItemDto>>({
    data: [],
    total: 0,
  });

  return {
    subscribe,
    set: (value: Store<ItemDto>) => set(value),
    get: async (id: string) => {
      try {
        if (!id) throw new HttpError(Errors.BadRequest, "Item Id is required");
        let document = await itemsRepository.getItem(id);
        return Dto.ToItemDto(document);
      } catch (error) {
        if (error instanceof HttpError) errorStore.add(error.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },

    getAll: async (options?: GenericListOptions) => {
      try {
        let { documents, total } = await itemsRepository.getItems(options);
        let itemsDto: ItemDto[] = documents.map((document) => {
          return Dto.ToItemDto(document);
        });

        const pages = Math.ceil(total / (options?.limit ?? 8));

        set({ data: itemsDto, total: total, pages: pages });
      } catch (error) {
        toastStore.set(ToastMessages.ERROR);
      }
    },

    getItemsByCategory: async (categoryId: string) => {
      try {
        let { documents, total } = await itemsRepository.getItemsByCategory(
          categoryId
        );

        if (documents.length == 0)
          throw new HttpError(Errors.NotFound, "Items not found");

        let itemsDto: ItemDto[] = documents.map((document) => {
          return Dto.ToItemDto(document);
        });

        return itemsDto;
      } catch (error) {
        if (error instanceof HttpError) errorStore.add(error.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },

    create: async (item: CreateItemRequest) => {
      try {
        if (item.name == "") {
          throw new HttpError(Errors.BadRequest, "Item Name is required");
        }
        if (item.image.url == "") {
          throw new HttpError(Errors.BadRequest, "Item Image is required");
        }
        if (item.price <= 0) {
          throw new HttpError(
            Errors.BadRequest,
            "Item Price Hast to Be Greater Than Zero"
          );
        }
        if (item.quantity <= 0 && item.quantity > 10000) {
          throw new HttpError(Errors.BadRequest, "Item Quantity Is Not Right");
        }
        if (item.productionDate >= item.expiredDate) {
          throw new HttpError(
            Errors.BadRequest,
            "Item Production Date Must Be Lesser Than The Expiration Date"
          );
        }
        if (item.categoryId.length == 0) {
          throw new HttpError(
            Errors.BadRequest,
            "Please Add A Category To The Item"
          );
        }
        if (item.image.url instanceof File) {
          item.image.url = (await ImageToUrl(item.image.url as File)) as string;
        }

        await itemsRepository.createItem(item);
        toastStore.set(ToastMessages.CREATE);
        goto("/items/1");
      } catch (error: any) {
        if (error instanceof HttpError) errorStore.add(error.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
    update: async (item: CreateItemRequest) => {
      try {
        const document = await itemsRepository.getItem(item.id as string);

        if (document === null) {
          throw new HttpError(Errors.NotFound, "Item Not Found");
        }
        if (item.name == "") {
          item.name = document.name;
        }
        if (item.price == 0) {
          item.price = document.price;
        }
        if (item.quantity == 0 && item.quantity <= 10000) {
          item.quantity = document.quantity;
        }
        if (item.productionDate >= item.expiredDate) {
          item.productionDate = document.productionDate;
        }
        if (item.expiredDate <= item.productionDate) {
          item.expiredDate = document.expiredDate;
        }
        if (item.categoryId.length != 0) {
          if (
            document.category.length === item.categoryId.length &&
            document.category.every(
              (category, index) => category.$id === item.categoryId[index]
            )
          ) {
            // Categories have the same id, change nothing
            item.categoryId = document.category.map((category) => category.$id);
          }
        }
        if (item.image.url == "") {
          item.image.url = document.itemImage;
        } else {
          if (item.image.url instanceof File) {
            item.image.url = (await ImageToUrl(
              item.image.url as File
            )) as string;
          }
        }
        if (item.detail == "") {
          item.detail = document.detail;
        }
        if (item.userId == "") {
          item.userId = document.userId;
        }

        await itemsRepository.updateItem(item);
        toastStore.set(ToastMessages.SUCCESS);
        goto("/items/1");
      } catch (error) {
        if (error instanceof HttpError) errorStore.add(error.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
    delete: async (id: string) => {
      try {
        const document = await itemsRepository.getItem(id);
        if (document === null) {
          throw new HttpError(Errors.NotFound, "Item Not Found");
        }

        await itemsRepository.deleteItem(id);
        itemStore.getAll();
        toastStore.set(ToastMessages.ERROR);
        return "Deleted";
      } catch (error) {
        if (error instanceof HttpError) errorStore.add(error.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
  };
};

export const itemStore = createItemStore();
