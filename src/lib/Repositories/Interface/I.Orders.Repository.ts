import type { Order } from "$lib/Models/Entities/Order.Entities.Model";
import type { CreateOrderRequest } from "$lib/Models/Requests/CreateOrder.Request";

export interface IOrdersRepository {
    getOrders(): Promise<AppwriteResponse<Order>>;

    getOrder(id: string): Promise<Order>;

    createOrder(order: CreateOrderRequest): Promise<void>;

    updateOrder(order: Order): Promise<Order>;

    updateOrderStatus(id: string, status: number): Promise<Order>;
}