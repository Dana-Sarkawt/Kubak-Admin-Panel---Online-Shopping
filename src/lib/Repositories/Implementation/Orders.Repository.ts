import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Environment } from "$lib/Env/Environment";
import type { Item } from "$lib/Models/Entities/Item.Entities.Model";
import type { Order } from "$lib/Models/Entities/Order.Entities.Model";
import type {
  CreateOrderRequest,
  OrderRequest,
} from "$lib/Models/Requests/CreateOrder.Request";
import type { IOrdersRepository } from "$lib/Repositories/Interface/I.Orders.Repository";
import { ID, Query } from "appwrite";
import { ItemsRepository } from "./Items.Repository";

const itemsRepository = new ItemsRepository();

export class OrdersRepository implements IOrdersRepository {
  async getOrders(): Promise<AppwriteResponse<Order>> {
    const { documents, total } = (await Appwrite.databases.listDocuments(
      Environment.appwrite_database,
      Environment.appwrite_collection_order,
      [Query.limit(8), Query.offset(0), Query.isNull("deletedAt")]
    )) as AppwriteResponse<Order>;

    return { documents, total };
  }
  async getOrder(id: string): Promise<Order> {
    return (await Appwrite.databases.getDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_order,
      id
    )) as Order;
  }
  async createOrder(order: CreateOrderRequest): Promise<void> {
    try {
      const items: Item[] = await itemsRepository.getItemsByIds(order.itemIds);
      const totalPrice = items.reduce((total, item) => total + item.price, 0);

      const orderRequest: OrderRequest = {
        userId: order.userId,
        items: items,
        totalPrice: totalPrice,
        status: 0,
      };

      await Appwrite.databases.createDocument(
        Environment.appwrite_database,
        Environment.appwrite_collection_order,
        ID.unique(),
        orderRequest
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async updateOrder(order: CreateOrderRequest): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  async updateOrderStatus(id: string, status: number): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  async deleteOrder(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
