import type { CategoryDto } from '$lib/Models/DTO/Category.DTO.Model';
import type { Category } from '$lib/Models/Entities/Category.Entity.Model';
export class Dto {
	static ToCategoriesDto(categories: Category): CategoryDto {
		try {
			let dto: CategoryDto = {
				id: categories.$id,
				name: categories.name,
				category_image: categories.categoryImage,
				createdAt: categories.$createdAt,
				updatedAt: categories.$updatedAt,
				deletedAt: categories.$deletedAt,
			};

			return dto;
		} catch (e: any) {
			throw new Error(e);
		}
	}
}
