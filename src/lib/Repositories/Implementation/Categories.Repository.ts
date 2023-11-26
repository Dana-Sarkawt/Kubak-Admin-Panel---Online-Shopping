import type { Category } from "$lib/Models/Entities/Category.Entity.Model";
import type { ICategoriesRepository } from "$lib/Repositories/Interface/I.Categories.Repository";
import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Environment } from "$lib/Env/Environment";
import { ID, Query } from "appwrite";
import type {
  CategoryRequest,
  CreateCategoryRequest,
} from "$lib/Models/Requests/CreateCategory.Request";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";

export class CategoriesRepository implements ICategoriesRepository {
  async getCategories(options:GenericListOptions): Promise<AppwriteResponse<Category>> {
    let { documents, total } = (await Appwrite.databases.listDocuments(
      Environment.appwrite_database,
      Environment.appwrite_collection_category,
      [
        Query.orderDesc(options.sortField ?? "$createdAt"),
        Query.limit(options.limit ?? 7),
        Query.offset((options.page! - 1 ?? 0) * (options.limit ?? 8)),
      ],
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
