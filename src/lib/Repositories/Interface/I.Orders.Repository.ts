export interface IOrdersRepository {
    getOrders(): Promise<Order[]>;

    getOrder(id: string): Promise<Order>;

    createOrder(order: Order): Promise<Order>;

    updateOrder(order: Order): Promise<Order>;

    deleteOrder(id: string): Promise<void>;
}