import { ItemsRepository } from "$lib/Repositories/Implementation/Items.Repository";
import type { Store } from "$lib/Models/Response/Store.Response";
import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { CreateItemRequest } from "$lib/Models/Requests/CreateItem.Request";
import { ImageToUrl } from "../../utils/ImageToUrl.Utils";
import { writable } from 'svelte/store';
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { goto } from "$app/navigation";

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
        let document = await itemsRepository.getItem(id);
        return Dto.ToItemDto(document);
      } catch (error) {
        console.log(error);
      }
    },

    getAll: async (options:GenericListOptions) => {
      try {
        let { documents, total } = await itemsRepository.getItems(options);
        let itemsDto: ItemDto[] = documents.map((document) => {
          return Dto.ToItemDto(document);
        });

        const pages = Math.ceil(total / 7);

        set({ data: itemsDto, total: total, pages: pages });
      } catch (error) {
        console.log(error);
      }
    },

    create: async (item: CreateItemRequest) => {
      try {
        if (item.name == "") {
          throw new Error("Category Name is required");
        }
        if (item.image.url == "") {
          throw new Error("Category Image is required");
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
        goto("/items");
      } catch (error: any) {
        console.log(error);
      }
    },
  };
};

export const itemStore = createItemStore();
