import { writable } from "svelte/store";
import type { Store } from "$lib/Models/Response/Store.Response";
import type { CategoryDto } from "$lib/Models/DTO/Category.DTO.Model";
import { CategoriesRepository } from "$lib/Repositories/Implementation/Categories.Repository";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { CreateCategoryRequest } from "$lib/Models/Requests/CreateCategory.Request.Model";
import { ImageToUrl } from "../../utils/ImageToUrl.Utils";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { toastStore } from "./Toast.Store";
import { ToastMessages } from "$lib/Models/Enums/Toast-Messages.Enum.Model";
import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model";
import { ItemsRepository } from "$lib/Repositories/Implementation/Items.Repository";

const categoriesRepository = new CategoriesRepository();
const itemsRepositories = new ItemsRepository();

const createCategoryStore = () => {
  // Create a writable store with an initial value of null
  const { subscribe, set, update } = writable<Store<CategoryDto>>({
    data: [],
    total: 0,
  });

  return {
    subscribe,
    set: (value: Store<CategoryDto>) => set(value),
    get: async (id: string) => {
      try {
        if (!id) return;
        let document = await categoriesRepository.getCategory(id);

        return Dto.ToCategoriesDto(document);
      } catch (e) {
        console.log("Error :", e);
      }
    },
    getAll: async (options?: GenericListOptions) => {
      try {
        let { documents, total } = await categoriesRepository.getCategories(
          options
        );

        let dto: CategoryDto[] = documents.map((document) => {
          return Dto.ToCategoriesDto(document) as CategoryDto;
        });

        const pages = Math.ceil(total / (options?.limit ?? 7));

        set({ data: dto, total: total, pages: pages });
        return dto;
      } catch (e) {
        console.log("Error:", e);
      }
    },
    create: async (category: CreateCategoryRequest) => {
      try {
        if (category.name == "") {
          throw new Error("Category Name is required");
        }
        if (category.image.url == "") {
          throw new Error("Category Image is required");
        }
        if (category.image.url instanceof File) {
          category.image.url = (await ImageToUrl(
            category.image.url as File
          )) as string;
        }

        await categoriesRepository.createCategory(category);
        toastStore.set(3);
      } catch (e) {
        console.log("Error :", e);
      }
    },
    update: async (category: CreateCategoryRequest) => {
      try {
        const document = await categoriesRepository.getCategory(
          category.id as string
        );
        if (document === null) {
          throw new Error(
            `Category not found with the following id:${category.id}`
          );
        }
        if (category.name == "") {
          category.name = document.name;
        }
        if (category.image.url != "") {
          if (category.image.url instanceof File) {
            category.image.url = (await ImageToUrl(
              category.image.url as File
            )) as string;
          }
        } else {
          category.image.url = document.categoryImage;
        }
        if (category.description == "") {
          category.description = document.description as string;
        }

        await categoriesRepository.updateCategory(category);
        await categoryStore.getAll();
        toastStore.set(ToastMessages.SUCCESS);
      } catch (e) {
        console.log("Error :", e);
        toastStore.set(4);
      }
    },
    delete: async (id: string, items?: ItemDto[]) => {
      try {
        let document = await categoriesRepository.getCategory(id);

        if (document === null)
          throw new Error(`Category not found with the following id:${id}`);

        await categoriesRepository.deleteCategory(id);
        if (items) {
          items = items.map((item) => {
            item.category = item.category?.filter(
              (category) => category.id !== id
            ) as CategoryDto[];
            return item as ItemDto;
          });
          await itemsRepositories.updateItemsCategories(items);
        }
        categoryStore.getAll({ limit: 7, page: 1 });
        toastStore.set(ToastMessages.ERROR);
        return "Deleted";
      } catch (e) {
        console.log("Error :", e);
      }
    },
  };
};

export const categoryStore = createCategoryStore();
