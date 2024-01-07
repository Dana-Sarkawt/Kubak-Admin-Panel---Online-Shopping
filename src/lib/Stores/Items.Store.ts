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
        if (!id) return;
        let document = await itemsRepository.getItem(id);
        return Dto.ToItemDto(document);
      } catch (error) {
        console.log(error);
        toastStore.set(ToastMessages.ERROR);
      }
    },

    getAll: async (options?: GenericListOptions) => {
      try {
        let { documents, total } = await itemsRepository.getItems(options);
        let itemsDto: ItemDto[] = documents.map((document) => {
          return Dto.ToItemDto(document);
        });

        const pages = Math.ceil(total / (options?.limit ?? 8));
        console.log("pages", options);

        set({ data: itemsDto, total: total, pages: pages });
      } catch (error) {
        console.log(error);
        toastStore.set(ToastMessages.ERROR);
      }
    },

    getItemsByCategory: async (categoryId: string) => {
      try {
        console.log("categoryId", categoryId);
        let { documents, total } = await itemsRepository.getItemsByCategory(
          categoryId
        );

        console.log("documents", documents);
        let itemsDto: ItemDto[] = documents.map((document) => {
          return Dto.ToItemDto(document);
        });

        return itemsDto;
      } catch (error) {
        console.log(error);
        toastStore.set(ToastMessages.ERROR);
      }
    },

    create: async (item: CreateItemRequest) => {
      try {
        if (item.name == "") {
          throw new Error("Item Name is required");
        }
        if (item.image.url == "") {
          throw new Error("Item Image is required");
        }
        if (item.price <= 0) {
          throw new Error("Item Price Hast to Be Greater Than Zero");
        }
        if (item.quantity <= 0 && item.quantity > 10000) {
          throw new Error("Item Quantity Is Not Right");
        }
        if (item.productionDate >= item.expiredDate) {
          throw new Error(
            "Item Production Date Must Be Lesser Than The Expiration Date"
          );
        }
        if (item.categoryId.length == 0) {
          throw new Error("Please Add A Category To The Item");
        }
        if (item.image.url instanceof File) {
          item.image.url = (await ImageToUrl(item.image.url as File)) as string;
        }

        await itemsRepository.createItem(item);
        toastStore.set(ToastMessages.CREATE);
        goto("/items/1");
      } catch (error: any) {
        console.log(error);
        toastStore.set(ToastMessages.WARNING);
      }
    },
    update: async (item: CreateItemRequest) => {
      try {
        const document = await itemsRepository.getItem(item.id as string);

        if (document === null) {
          throw new Error("Item Not Found");
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
        console.log("Error: ", error);
        toastStore.set(ToastMessages.WARNING);
      }
    },
    delete: async (id: string) => {
      try {
        const document = await itemsRepository.getItem(id);
        if (document === null) {
          throw new Error("Item Not Found");
        }

        await itemsRepository.deleteItem(id);
        itemStore.getAll();
        toastStore.set(ToastMessages.ERROR);
      } catch (error) {
        console.log(error);
        toastStore.set(ToastMessages.WARNING);
      }
    },
  };
};

export const itemStore = createItemStore();
