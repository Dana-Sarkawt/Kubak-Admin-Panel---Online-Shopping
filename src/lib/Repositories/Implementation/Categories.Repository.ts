import type { Category } from "$lib/Models/Entities/Category.Entity.Model";
import type { ICategoriesRepository } from "$lib/Repositories/Interface/I.Categories.Repository";
import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Environment } from "$lib/Env/Environment";
import { ID, Query } from "appwrite";
import type {
  CategoryRequest,
  CreateCategoryRequest,
} from "$lib/Models/Requests/CreateCategory.Request.Model";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { toastStore } from "$lib/Stores/Toast.Store";

export class CategoriesRepository implements ICategoriesRepository {
  async getCategories(
    options?: GenericListOptions
  ): Promise<AppwriteResponse<Category>> {
    try {
      const query = this.filterQuery([], options);

      let { documents, total } = (await Appwrite.databases.listDocuments(
        Environment.appwrite_database_online_shopping,
        Environment.appwrite_collection_category,
        query
      )) as AppwriteResponse<Category>;

      return { documents, total };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async getCategory(id: string): Promise<Category> {
    try{
      const category = await Appwrite.databases.getDocument(
        Environment.appwrite_database_online_shopping,
        Environment.appwrite_collection_category,
        id
      ) as Category;

      return category;
    } catch (e) {
      console.log(e);
      toastStore.set(2);
      throw e;
    }
  }

  async getCategoriesByIds(ids: string[]): Promise<Category[]> {
    let categories = ids.map((id) => this.getCategory(id));
    return Promise.all(categories);
  }

  async createCategory(category: CreateCategoryRequest): Promise<void> {
    const categoryRequest: CategoryRequest = {
      userId: category.userId as string,
      name: category.name,
      categoryImage: category.image.url as string,
      description: category.description,
    };

    await Appwrite.databases.createDocument(
      Environment.appwrite_database_online_shopping,
      Environment.appwrite_collection_category,
      ID.unique(),
      categoryRequest
    );
  }

  async updateCategory(category: CreateCategoryRequest): Promise<Category> {
    try {

      const categoryRequest: CategoryRequest = {
        name: category.name,
        categoryImage: category.image.url as string,
        description: category.description,
      };
      const result = await Appwrite.databases.updateDocument(
        Environment.appwrite_database_online_shopping,
        Environment.appwrite_collection_category,
        category.id as string,
        categoryRequest
      );

      return result as Category;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id: string): Promise<void> {
    await Appwrite.databases.updateDocument(
      Environment.appwrite_database_online_shopping,
      Environment.appwrite_collection_category,
      id,
      {
        deletedAt: new Date(),
      }
    );
  }

  private filterQuery(query: string[], options?: GenericListOptions): string[] {
    query = [
      Query.orderDesc(options?.sortField || "$createdAt"),
      Query.limit(options?.limit || 7),
      Query.offset((options?.page! - 1 || 0) * (options?.limit || 7)),
      Query.isNull("deletedAt"),
    ];
    if (options?.search) {
      query.push(Query.startsWith("name", options?.search));
    }
    if (options?.from && options?.to) {
      query.push(Query.between("$createdAt", options?.from, options?.to));
    }
    return query;
  }
}
