import { ItemsRepository } from "$lib/Repositories/Implementation/Items.Repository";
import type { Store } from "$lib/Models/Response/Store.Response";
import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { CreateItemRequest } from "$lib/Models/Requests/CreateItem.Request";
import { ImageToUrl } from "../../utils/ImageToUrl.Utils";
import { writable } from "svelte/store";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { goto } from "$app/navigation";
import type { Category } from "$lib/Models/Entities/Category.Entity.Model";
import { CategoriesRepository } from "$lib/Repositories/Implementation/Categories.Repository";

const itemsRepository = new ItemsRepository();
const categoriesRepository = new CategoriesRepository();

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

    getAll: async (options?: GenericListOptions) => {
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
        goto("/items/1");
      } catch (error: any) {
        console.log(error);
      }
    },
    update: async (item: CreateItemRequest) => {
      const document = await itemsRepository.getItem(item.id as string);

      if (document === null) {
        throw new Error("Item Not Found");
      }
      if (item.name != "") {
        document.name = item.name;
      }
      if (item.price != 0) {
        document.price = item.price;
      }
      if (item.quantity != 0 && item.quantity <= 10000) {
        document.quantity = item.quantity;
      }
      if (item.productionDate <= item.expiredDate) {
        document.productionDate = item.productionDate;
      }
      if (item.expiredDate >= item.productionDate) {
        document.expiredDate = item.expiredDate;
      }
      if (item.categoryId.length != 0) {
        if (
          document.category.length === item.categoryId.length &&
          document.category.every(
            (category, index) => category.$id === item.categoryId[index]
          )
        ) {
          // Categories have the same id, change nothing
        } else {
          document.category = await Promise.all(
            item.categoryId.map(async (id) => {
              return (await categoriesRepository.getCategory(id)) as Category;
            })
          );
        }
      }
      if (item.image.url != "") {
        if (item.image.url instanceof File) {
          item.image.url = (await ImageToUrl(item.image.url as File)) as string;
        }
        document.itemImage = item.image.url;
      }
      if (item.detail != "") {
        document.detail = item.detail as string;
      }

      await itemsRepository.updateItem(document);
      goto("/items");
    },
    delete: async (id: string) => {
      try {
        const document = await itemsRepository.getItem(id);
        if (document === null) {
          throw new Error("Item Not Found");
        }

        document.deletedAt = new Date();
        await itemsRepository.updateItem(document);
        itemStore.getAll();
      } catch (error) {
        console.log(error);
      }
    },
  };
};

export const itemStore = createItemStore();
