import type { Category } from "$lib/Models/Entities/Category.Entity.Model";
import type { CreateUpdateCategoryRequest } from "$lib/Models/Requests/CreateUpdateCategory.Request";

export interface ICategoriesRepository {
    getCategories(): Promise<AppwriteResponse<Category>>;
    getCategory(id: string): Promise<Category>;
    createCategory(category: CreateUpdateCategoryRequest): Promise<void>;
    updateCategory(category: Category): Promise<Category>;
    deleteCategory(id: string): Promise<void>;
}