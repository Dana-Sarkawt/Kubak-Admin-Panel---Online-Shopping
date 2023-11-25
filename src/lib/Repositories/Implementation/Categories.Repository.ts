import type { Category } from "$lib/Models/Entities/Category.Entity.Model";
import type { ICategoriesRepository } from "$lib/Repositories/Interface/I.Categories.Repository";
import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Environment } from "$lib/Env/Environment";
import { ID } from "appwrite";
import type {
  CategoryRequest,
  CreateCategoryRequest,
} from "$lib/Models/Requests/CreateUpdateCategory.Request";

export class CategoriesRepository implements ICategoriesRepository {
  async getCategories(): Promise<AppwriteResponse<Category>> {
    let { documents, total } = (await Appwrite.databases.listDocuments(
      Environment.appwrite_database,
      Environment.appwrite_collection_category
    )) as AppwriteResponse<Category>;

    return { documents, total };
  }

  async getCategory(id: string): Promise<Category> {
    return (await Appwrite.databases.getDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_category,
      id
    )) as Category;
  }

  async createCategory(category: CreateCategoryRequest): Promise<void> {
    const categoryRequest: CategoryRequest = {
      userId: category.userId,
      name: category.name,
      categoryImage: category.image.url as string,
      description: category.description,
    };

    await Appwrite.databases.createDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_category,
      ID.unique(),
      categoryRequest
    );
  }

  async updateCategory(category: Category): Promise<Category> {
    const result = await Appwrite.databases.updateDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_category,
      category.$id,
      category
    );

    return result as Category;
  }

  async deleteCategory(id: string): Promise<void> {
    await Appwrite.databases.updateDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_category,
      id,
      {
        deletedAt: Date.now(),
      }
    );
  }
}
