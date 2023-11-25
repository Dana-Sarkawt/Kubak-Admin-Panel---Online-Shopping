import type {CategoryDto} from '$lib/Models/DTO/Category.DTO.Model';
import type {Category} from '$lib/Models/Entities/Category.Entity.Model';
import type {AuthDto} from '$lib/Models/DTO/Auth.DTO.Model';
import type {Auth} from '$lib/Models/Entities/Auth.Entity.Model';
import type { Item } from '../Entities/Item.Entities.Model';
import type { ItemDto } from '../DTO/Item.DTO.Model';

export class Dto {
    static ToCategoriesDto(categories: Category): CategoryDto | null {
        try {
            if(!categories){
                return null;
            }
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

    static ToItemDto(item:Item): ItemDto{
        try {
            return {
                id: item.$id,
                name:item.name,
                price: item.price,
                itemImage: item.itemImage,
                productionDate: item.productionDate,
                expiredDate: item.expiredDate,
                quantity: item.quantity,
                detail: item.detail,
                popularity: item.popularity,
                category: Dto.ToCategoriesDto(item.category),
                createdAt:item.$createdAt as Date,
                updatedAt:item.$updatedAt as Date,
                deletedAt:item.deletedAt as Date | null
            };
        } catch (error:any) {
            throw new Error(error);
        }
    }
}
