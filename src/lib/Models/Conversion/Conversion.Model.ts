import type {CategoryDto} from '$lib/Models/DTO/Category.DTO.Model';
import type {Category} from '$lib/Models/Entities/Category.Entity.Model';
import type {AuthDto} from '$lib/Models/DTO/Auth.DTO.Model';
import type {Auth} from '$lib/Models/Entities/Auth.Entity.Model';

export class Dto {
    static ToCategoriesDto(categories: Category): CategoryDto {
        try {
            return {
                id: categories.$id,
                name: categories.name,
                categoryImage: categories.categoryImage,
                createdAt: categories.$createdAt as Date,
                updatedAt: categories.$updatedAt as Date,
                deletedAt: categories.deletedAt as Date | null,
            };
        } catch (e: any) {
            throw new Error(e);
        }
    }

    static ToAuthDto(auth: Auth): AuthDto {
        return {
            id: auth.$id,
            name: auth.name,
            phone: auth.phone,
            imgUrl: auth.prefs!.image as string,
            roles: auth.labels,
        }
    }
}
