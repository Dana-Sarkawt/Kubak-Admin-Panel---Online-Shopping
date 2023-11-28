import type { Item } from "$lib/Models/Entities/Item.Entities.Model";

export interface CreateOrderRequest {
    userId: string;
    items: RequestSelectedItems[];
}

export interface RequestSelectedItems{
    itemId: string;
    quantity: number;
}


export interface OrderRequest {
    userId: string;
    status: number;
    totalPrice: number;
    items: Item[];
}