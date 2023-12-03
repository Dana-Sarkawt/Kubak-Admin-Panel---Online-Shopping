
export interface CreateOrderRequest {
    id?: string | null;
    userId: string;
    items: RequestSelectedItems[];
    addressId: string;
}

interface RequestSelectedItems{
    itemId: string;
    quantity: number;
}


export interface OrderRequest {
    userId: string;
    status: number;
    totalPrice: number;
    items: string[];
}