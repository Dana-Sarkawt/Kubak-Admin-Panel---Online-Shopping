import type { Category } from "$lib/Models/Entities/Category.Entity.Model";
import type { ICategoriesRepository } from "$lib/Repositories/Interface/I.Categories.Repository";
import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Enviroment } from "$lib/Env/Enviroment";
import { ID } from "appwrite";
import type { CreateUpdateCategoryRequest } from "$lib/Models/Requests/CreateUpdateCategory.Request";

export class CategoriesRepository implements ICategoriesRepository {
  async getCategories(): Promise<AppwriteResponse<Category>> {
    let { documents, total } = (await Appwrite.databases.listDocuments(
      Enviroment.appwrite_database,
      Enviroment.appwrite_collection_category
    )) as AppwriteResponse<Category>;

    return { documents, total };
  }
  async getCategory(id: string): Promise<Category> {
    const document = (await Appwrite.databases.getDocument(
      Enviroment.appwrite_database,
      Enviroment.appwrite_collection_category,
      id
    )) as Category;

    return document;
  }
  async createCategory(category: CreateUpdateCategoryRequest): Promise<void> {
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
  async updateCategory(category: Category): Promise<Category> {
   const result = await Appwrite.databases.updateDocument(Enviroment.appwrite_database,
      Enviroment.appwrite_collection_category,category.$id, category);

    return result as Category;
  }
  async deleteCategory(id: string): Promise<void> {
    await Appwrite.databases.updateDocument(Enviroment.appwrite_database,
      Enviroment.appwrite_collection_category,id,{
        deletedAt: Date.now()
    });
  }
}
