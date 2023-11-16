import type { CategoryDto } from "$lib/Models/DTO/Category.DTO.Model";
import type { Category } from "$lib/Models/Entities/Category.Entity.Model";
import type { AppwriteResponse } from "$lib/Models/Response/Appwrite.Response.Model";
import type { ICategoriesRepository } from "$lib/Repositories/Interface/I.Categories.Repository";

export class CategoriesRepository implements ICategoriesRepository{
    getCategories(): Promise<AppwriteResponse<Category>> {
        throw new Error("Method not implemented.");
    }
    getCategory(id: string): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    createCategory(category: CategoryDto): Promise<Category> {
        throw new Error("Method not implemented.");
    }
    updateCategory(category: CategoryDto): Promise<Category> {
        throw new Error("Method not implemented.");
    }
}