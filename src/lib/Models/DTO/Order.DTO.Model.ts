import type { Datetime } from "$lib/Models/Extensions/Datetime.Extention.Model";
import type { ItemDto } from "$lib/Models/DTO/Item.DTO.Model";
import type { AddressDto } from "$lib/Models/DTO/Address.DTO.Model";
import type { AuthDto } from "./Auth.DTO.Model";

export interface OrderDto extends Datetime {
    id: string,
    user: AuthDto | string,
    status: number,
    totalAmount: number,
    items: ItemDto[],
    address: AddressDto | null
}