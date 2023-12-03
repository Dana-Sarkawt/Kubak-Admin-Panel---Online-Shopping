import type { Datetime } from "$lib/Models/Extensions/Datetime.Extention.Model";
import type { CategoryDto } from "$lib/Models/DTO/Category.DTO.Model";

export interface ItemDto extends Datetime {
    id: string;
    name: string;
    price: number;
    itemImage: string;
    productionDate: Date;
    expiredDate: Date;
    quantity: number;
    detail: string;
    popularity: number;
    category: CategoryDto[] | null;
}