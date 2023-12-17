import type { ItemDto } from "./Item.DTO.Model";
import type { OrderDto } from "./Order.DTO.Model";

export interface ItemsBlockerDto {
    id: string,
    quantity: number,
    items?: ItemDto | null,
    order?:OrderDto | null
}