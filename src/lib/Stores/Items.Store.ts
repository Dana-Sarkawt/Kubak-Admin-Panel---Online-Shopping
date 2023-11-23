import { writable } from "svelte/store";
import { ItemsRepository } from "../Repositories/Implementation/Items.Repository";
import { CategoriesRepository } from "$lib/Repositories/Implementation/Categories.Repository";
import type { Store } from "$lib/Models/Response/Store.Response";
import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { CreateItemRequest } from "$lib/Models/Requests/CreateItem.Request";
import { ImageToUrl } from "../../utils/ImageToUrl.Utils";
import type { Category } from "$lib/Models/Entities/Category.Entity.Model";

const itemsRepository = new ItemsRepository();
const categoryRepository = new CategoriesRepository();

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

    getAll: async () => {
      try {
        let { documents, total } = await itemsRepository.getItems();
        let itemsDto: ItemDto[] = documents.map((document) => {
          return Dto.ToItemDto(document);
        });

        set({ data: itemsDto, total: total });
      } catch (error) {
        console.log(error);
      }
    },

    create: async (item: CreateItemRequest) => {
        try{
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
            if (item.productionDate >= item.expireDate) {
              throw new Error(
                "Item Production Date Must Be Lesser Than The Expiration Date"
              );
            }
            if (!item.category) {
              throw new Error("Please Add A Category To The Item");
            }
            if (item.image.url instanceof File) {
              item.image.url = await ImageToUrl(item.image.url as File);
            }

            item.category = await categoryRepository.getCategory(item.category as string);

            console.log(item.category);
            await itemsRepository.createItem(item);
        }catch(error:any){
            console.log(error);
        }
    },
  };
};

export const itemStore = createItemStore();
