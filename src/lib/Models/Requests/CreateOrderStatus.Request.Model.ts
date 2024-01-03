export interface CreateOrderStatusRequest{
    id?:string;
    orderId:string;
    driverId:string;
    status:string | null;
    destination:string | null;
    deletedAt?:Date | null;
}

export interface OrderStatusRequest{
    orderId:string;
    orders:string;
    driverId:string;
    drivers:string;
    status:string | null;
    destination:string | null;
    deletedAt?:Date | null;
}