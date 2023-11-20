import type { CategoryDto } from '$lib/Models/DTO/Category.DTO.Model';
import type { Category } from '$lib/Models/Entities/Category.Entity.Model';
export class Dto {
	static ToCategoriesDto(categories: Category): CategoryDto {
		try {
			let dto: CategoryDto = {
				id: categories.$id,
				name: categories.name,
				categoryImage: categories.categoryImage,
				createdAt: categories.$createdAt as Date,
				updatedAt: categories.$updatedAt as Date,
				deletedAt: categories.deletedAt as Date | null,
			};
			return dto;
		} catch (e: any) {
			throw new Error(e);
		}
	}
}
