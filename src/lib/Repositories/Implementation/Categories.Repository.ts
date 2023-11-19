import type { CategoryDto } from "$lib/Models/DTO/Category.DTO.Model";
import type { Category } from "$lib/Models/Entities/Category.Entity.Model";
import type { AppwriteResponse } from "$lib/Models/Response/Appwrite.Response.Model";
import type { ICategoriesRepository } from "$lib/Repositories/Interface/I.Categories.Repository";
import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Enviroment } from "$lib/Env/Enviroment";
import { ID } from "appwrite";
import type { CreateCategoryRequest } from "$lib/Models/Requests/CreateCategory.Request";

export class CategoriesRepository implements ICategoriesRepository {
  async getCategories(): Promise<AppwriteResponse<Category>> {
    throw new Error("Method not implemented.");
  }
  async getCategory(id: string): Promise<Category> {
    throw new Error("Method not implemented.");
  }
  async createCategory(category: CreateCategoryRequest): Promise<void> {
    await Appwrite.databases.createDocument(
      Enviroment.appwrite_database,
      Enviroment.appwrite_collection_category,
      ID.unique(),
      {
        name: category.name,
        categoryImage: category.image.url,
        userId: category.userId,
        description: category.description,
      }
    );
  }
  async updateCategory(category: CategoryDto): Promise<Category> {
    throw new Error("Method not implemented.");
  }
}
