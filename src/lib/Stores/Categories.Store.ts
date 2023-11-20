import { writable } from "svelte/store";
import type { Store } from "$lib/Models/Response/Store.Response";
import type { CategoryDto } from "$lib/Models/DTO/Category.DTO.Model";
import { CategoriesRepository } from "$lib/Repositories/Implementation/Categories.Repository";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { CreateUpdateCategoryRequest } from "$lib/Models/Requests/CreateUpdateCategory.Request";
import { ImageToUrl } from "../../utils/ImageToUrl.Utils";

const categoriesRepository = new CategoriesRepository();

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
        let document = await categoriesRepository.getCategory(id);

        let dto: CategoryDto = Dto.ToCategoriesDto(document);

        return dto;
      } catch (e) {
        console.log("Error :", e);
      }
    },
    getAll: async () => {
      try {
        let { documents, total } = await categoriesRepository.getCategories();

        let dto: CategoryDto[] = documents.map((document) => {
          return Dto.ToCategoriesDto(document);
        });
        set({ data: dto, total: total });
      } catch (e) {
        console.log("Error:", e);
      }
    },
    create: async (category: CreateUpdateCategoryRequest) => {
      try {
        if (category.name == "") {
          throw new Error("Category Name is required");
        }
        if (category.image.url == "") {
          throw new Error("Category Image is required");
        }
        if (category.image.url instanceof File) {
          category.image.url = await ImageToUrl(category.image.url as File);
        }

        await categoriesRepository.createCategory(category);
      } catch (e) {
        console.log("Error :", e);
      }
    },
    update: async (category: CreateUpdateCategoryRequest) => {
      try {
        const document = await categoriesRepository.getCategory(
          category.id as string
        );

        if (document === null) {
          throw new Error(
            `Category not found with the following id:${category.id}`
          );
        }

        if (category.name != "") {
          document.name = category.name;
        }
        if (category.image.url != "") {
          if (category.image.url instanceof File) {
            category.image.url = await ImageToUrl(category.image.url as File);
          }
          document.categoryImage = category.image.url;
        }
        if (category.description != "") {
          document.description = category.description!;
        }

        await categoriesRepository.updateCategory(document);
      } catch (e) {
        console.log("Error :", e);
      }
    },
    delete: async (id: string) => {
      try {
        let document = await categoriesRepository.getCategory(id);

        if (document === null)
          throw new Error(`Category not found with the following id:${id}`);

        await categoriesRepository.deleteCategory(id);

        return "Deleted";
      } catch (e) {
        console.log("Error :", e);
      }
    },
  };
};

export const categoryStore = createCategoryStore();
