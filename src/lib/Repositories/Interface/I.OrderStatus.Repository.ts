import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { OrderStatus } from "$lib/Models/Entities/OrderStatus.Entity.Model";
import type { CreateOrderStatusRequest, OrderStatusRequest } from "$lib/Models/Requests/CreateOrderStatus.Request.Model";

export interface IOrderStatusRepository {
    createOrderStatus(orderStatus: CreateOrderStatusRequest): Promise<void>;
    getOrderStatus(id: string): Promise<OrderStatus>;
    getOrderStatuses(options?:GenericListOptions): Promise<AppwriteResponse<OrderStatus>>;
    getOrderStatusByOrderId(orderId: string): Promise<OrderStatus>;
    updateOrderStatus(id: string, orderStatus: CreateOrderStatusRequest): Promise<OrderStatusRequest>;
    deleteOrderStatus(id: string): Promise<void>;
}