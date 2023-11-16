import type { CategoryDto } from "$lib/Models/DTO/Category.DTO.Model";
import type { Category } from "$lib/Models/Entities/Category.Entity.Model";
import type { AppwriteResponse } from "$lib/Models/Response/Appwrite.Response.Model";

export interface ICategoriesRepository {
    getCategories(): Promise<AppwriteResponse<Category>>;
    getCategory(id: string): Promise<Category>;
    createCategory(category: CategoryDto): Promise<Category>;
    updateCategory(category: CategoryDto): Promise<Category>;
}