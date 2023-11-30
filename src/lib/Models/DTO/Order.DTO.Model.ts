import type { Datetime } from "$lib/Models/Extensions/Datetime.Extention.Model";
import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model";
import type { AddressDto } from "$lib/Models/DTO/Address.DTO.Model";

export interface OrderDto extends Datetime {
    id: string;
    userId: string;
    status: number;
    totalPrice: number;
    items: ItemDto[];
    address: AddressDto
}