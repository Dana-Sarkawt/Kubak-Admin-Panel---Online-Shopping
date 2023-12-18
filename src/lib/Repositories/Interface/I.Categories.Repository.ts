import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Category } from "$lib/Models/Entities/Category.Entity.Model";
import type { CreateCategoryRequest } from "$lib/Models/Requests/CreateCategory.Request.Model";

export interface ICategoriesRepository {
  getCategories(
    options?: GenericListOptions
  ): Promise<AppwriteResponse<Category>>;

  getCategory(id: string): Promise<Category>;

  getCategoriesByIds(ids: string[]): Promise<Category[]>; // get categories by ids

  createCategory(category: CreateCategoryRequest): Promise<void>;

  updateCategory(category: CreateCategoryRequest): Promise<Category>;

  deleteCategory(id: string): Promise<void>;
}
