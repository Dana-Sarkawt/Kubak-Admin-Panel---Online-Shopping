export interface CreateOrderStatusRequest{
    orderId:string;
    driverId:string;
    status:string | null;
    destination:string | null;
    deletedAt?:Date | null;
}

export interface OrderStatusRequest{
    orderId:string;
    order:string;
    driverId:string;
    driver:string;
    status:string | null;
    destination:string | null;
    deletedAt?:Date | null;
}