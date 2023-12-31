import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Order } from "$lib/Models/Entities/Order.Entities.Model";
import type { CreateOrderRequest } from "$lib/Models/Requests/CreateOrder.Request.Model";

export interface IOrdersRepository {
    getOrders(options?:GenericListOptions): Promise<AppwriteResponse<Order>>;

    getOrder(id: string): Promise<Order>;

    createOrder(order: CreateOrderRequest): Promise<void>;

    updateOrder(order: CreateOrderRequest): Promise<Order>;

    updateOrderStatus(id: string, status: number): Promise<Order>;
}