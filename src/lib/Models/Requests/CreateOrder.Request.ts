import type { Item } from "$lib/Models/Entities/Item.Entities.Model";

export interface CreateOrderRequest {
    id: string | null;
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