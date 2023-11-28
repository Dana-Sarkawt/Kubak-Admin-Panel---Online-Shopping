import type { Item } from "$lib/Models/Entities/Item.Entities.Model";

export interface CreateOrderRequest {
    userId: string;
    items: SelectedItems[];
}

interface SelectedItems{
    itemId: string;
    quantity: number;
}


export interface OrderRequest {
    userId: string;
    status: number;
    totalPrice: number;
    items: Item[];
}