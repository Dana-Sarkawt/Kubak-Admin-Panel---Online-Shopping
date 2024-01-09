import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Environment } from "$lib/Env/Environment";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { OrderStatus } from "$lib/Models/Entities/OrderStatus.Entity.Model";
import type {
  CreateOrderStatusRequest,
  OrderStatusRequest,
} from "$lib/Models/Requests/CreateOrderStatus.Request.Model";
import type { IOrderStatusRepository } from "$lib/Repositories/Interface/I.OrderStatus.Repository";
import { ID, Query } from "appwrite";

export class OrderStatusRepository implements IOrderStatusRepository {
  async createOrderStatus(
    orderStatus: CreateOrderStatusRequest
  ): Promise<void> {
    try {
      const orderStatusRequest: OrderStatusRequest = {
        orderId: orderStatus.orderId,
        orders: orderStatus.orderId,
        driverId: orderStatus.driverId,
        drivers: orderStatus.driverId,
        status: orderStatus.status ?? null,
        destination: orderStatus.destination,
      };
      console.log(orderStatusRequest);
      
      await Appwrite.databases.createDocument(
        Environment.appwrite_database_online_shopping,
        Environment.appwrite_collection_order_status,
        ID.unique(),
        orderStatusRequest
      );
    } catch (error) {
      throw error;
    }
  }
  async getOrderStatus(id: string): Promise<OrderStatus> {
    try {
      return (await Appwrite.databases.getDocument(
        Environment.appwrite_database_online_shopping,
        Environment.appwrite_collection_order_status,
        id
        )) as OrderStatus;
    } catch (error) {
      throw error;
    }
  }
  async getOrderStatuses(
    options?: GenericListOptions
  ): Promise<AppwriteResponse<OrderStatus>> {
    try {
      const query = this.filterQuery([], options);
      const { documents, total } = (await Appwrite.databases.listDocuments(
        Environment.appwrite_database_online_shopping,
        Environment.appwrite_collection_order_status,
        [Query.isNull("deletedAt")]
      )) as AppwriteResponse<OrderStatus>;
      return { documents, total };
    } catch (error) {
      throw error;
    }
  }
  async getOrderStatusByOrderId(orderId: string): Promise<OrderStatus> {
    try {
      const { documents } = (await Appwrite.databases.listDocuments(
        Environment.appwrite_database_online_shopping,
        Environment.appwrite_collection_order_status,
        [Query.equal("orderId", orderId)]
      )) as AppwriteResponse<OrderStatus>;
      return documents[0];
    } catch (error) {
      throw error;
    }
  }
  async getOrderStatusByDriverId(driverId: string): Promise<OrderStatus> {
    try {
      const { documents } = (await Appwrite.databases.listDocuments(
        Environment.appwrite_database_online_shopping,
        Environment.appwrite_collection_order_status,
        [Query.equal("driverId", driverId)]
      )) as AppwriteResponse<OrderStatus>;
      return documents[0];
    } catch (error) {
      throw error;
    }
  }
  async updateOrderStatus(
    orderStatus: CreateOrderStatusRequest
  ): Promise<OrderStatusRequest> {
    try {
      const orderStatusRequest: OrderStatusRequest = {
        orderId: orderStatus.orderId,
        orders: orderStatus.orderId,
        driverId: orderStatus.driverId,
        drivers: orderStatus.driverId,
        status: orderStatus.status,
        destination: orderStatus.destination,
      };
      await Appwrite.databases.updateDocument(
        Environment.appwrite_database_online_shopping,
        Environment.appwrite_collection_order_status,
        orderStatus.id!,
        orderStatusRequest
      );
      return orderStatusRequest;
    } catch (error) {
      throw error;
    }
  }
  async deleteOrderStatus(id: string): Promise<void> {
    try {
      await Appwrite.databases.updateDocument(
        Environment.appwrite_database_online_shopping,
        Environment.appwrite_collection_order_status,
        id,
        {
          deletedAt: new Date(),
        }
      );
    } catch (error) {
      throw error;
    }
  }

  private filterQuery(query: string[], options?: GenericListOptions): string[] {
    query = [
      Query.orderDesc(options?.sortField || "$createdAt"),
      Query.limit(options?.limit || 8),
      Query.offset((options?.page! - 1 || 0) * (options?.limit || 8)),
      Query.isNull("deletedAt"),
      Query.select([
        "$id",
        "driverId",
        "orderId",
        "status",
        "destination",
        "$createdAt",
        "$updatedAt",
        "deletedAt",
      ]),
    ];
    if (options?.from && options?.to) {
      query.push(Query.between("$createdAt", options?.from, options?.to));
    }
    return query;
  }
}
