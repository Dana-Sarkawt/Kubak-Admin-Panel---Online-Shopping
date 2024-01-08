import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Environment } from "$lib/Env/Environment";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Order } from "$lib/Models/Entities/Order.Entities.Model";
import type { CreateOrderRequest, OrderRequest } from "$lib/Models/Requests/CreateOrder.Request.Model";
import type { IOrdersRepository } from "$lib/Repositories/Interface/I.Orders.Repository";
import { Query } from "appwrite";

export class OrdersRepository implements IOrdersRepository {
  async getOrders(options?:GenericListOptions): Promise<AppwriteResponse<Order>> {
    const query = this.filterQuery([], options);
    const { documents, total } = (await Appwrite.databases.listDocuments(
      Environment.appwrite_database_online_shopping,
      Environment.appwrite_collection_order,
      query
    )) as AppwriteResponse<Order>;

    return { documents, total };
  }
  async getOrder(id: string): Promise<Order> {
    return (await Appwrite.databases.getDocument(
      Environment.appwrite_database_online_shopping,
      Environment.appwrite_collection_order,
      id
    )) as Order;
  }
  async createOrder(order: CreateOrderRequest): Promise<void> {
    try {
      await Appwrite.functions.createExecution(
        Environment.appwrite_function_create_order,
        JSON.stringify(order),
        false,
        "/",
        "POST"
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async updateOrder(order: CreateOrderRequest): Promise<Order> {
    const orderRequest: OrderRequest ={
      userId: order.userId,
      totalPrice: order.items.reduce((total, item) => total + item.quantity * item.price, 0),
      items: order.items.map(item => item.itemId),
    }
    const orderResult = await Appwrite.databases.updateDocument(
      Environment.appwrite_database_online_shopping,
      Environment.appwrite_collection_order,
      order.id as string,
      orderRequest
    );
    return orderResult as Order;
  }
  async updateOrderStatus(id: string, status: number): Promise<Order> {
    const orderResult = await Appwrite.databases.updateDocument(
      Environment.appwrite_database_online_shopping,
      Environment.appwrite_collection_order,
      id,
      {
        status,
      }
    );
    return orderResult as Order;
  }
  async deleteOrder(id: string): Promise<void> {
    await Appwrite.databases.updateDocument(
      Environment.appwrite_database_online_shopping,
      Environment.appwrite_collection_order,
      id,
      {
        deletedAt: Date.now(),
      }
    );
  }
  private filterQuery(query: string[], options?: GenericListOptions): string[] {
    query = [
      Query.orderDesc(options?.sortField || "$createdAt"),
      Query.limit(options?.limit || 15),
      Query.isNull("deletedAt"),
      Query.select([
        "$id",
        "status",
        "totalAmount",
        "userId",
        "addressId",
        "itemIds",
        "$createdAt",
        "$updatedAt",
        "deletedAt",
      ])
    ];
    if (options?.status && options?.status != -2) {
      query.push(Query.equal("status", options?.status));
    }
    if (options?.from && options?.to) {
      query.push(Query.between("$createdAt", options?.from, options?.to));
    }
    return query;
  }
}
