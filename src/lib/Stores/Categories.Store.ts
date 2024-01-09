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
import { errorStore } from "./Errors.Store";
import { HttpError } from "$lib/Errors/HttpErrors.Error";
import { Errors } from "$lib/Models/Enums/Errors.Enum.Model";

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
    get: async (id?: string) => {
      errorStore.clear();
      try {
        if (!id) {
          throw new HttpError(Errors.NotFound, "Id is Required");
        }
        let document = await categoriesRepository.getCategory(id);

        return Dto.ToCategoriesDto(document);
      } catch (e) {
        if (e instanceof HttpError) errorStore.add(e.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
    getAll: async (options?: GenericListOptions) => {
      errorStore.clear();
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
        toastStore.set(ToastMessages.WARNING);
      }
    },
    create: async (category: CreateCategoryRequest) => {
      errorStore.clear();
      try {
        if (category.name == "") {
          throw new HttpError(Errors.BadRequest, "Category Name is required");
        }
        if (category.image.url == "") {
          throw new HttpError(Errors.BadRequest, "Category Image is required");
        }
        if (category.image.url instanceof File) {
          category.image.url = (await ImageToUrl(
            category.image.url as File
          )) as string;
        }

        await categoriesRepository.createCategory(category);
        toastStore.set(ToastMessages.SUCCESS);
      } catch (e) {
        if (e instanceof HttpError) errorStore.add(e.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
    update: async (category: CreateCategoryRequest) => {
      errorStore.clear();
      try {
        const document = await categoriesRepository.getCategory(
          category.id as string
        );
        if (document === null) {
          throw new HttpError(
            Errors.NotFound,
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
        if (e instanceof HttpError) errorStore.add(e.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
    delete: async (id: string, items?: ItemDto[]) => {
      errorStore.clear();
      try {
        let document = await categoriesRepository.getCategory(id);

        if (document === null)
          throw new HttpError(
            Errors.NotFound,
            `Category not found with the following id:${id}`
          );

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
        if (e instanceof HttpError) errorStore.add(e.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
  };
};

export const categoryStore = createCategoryStore();
