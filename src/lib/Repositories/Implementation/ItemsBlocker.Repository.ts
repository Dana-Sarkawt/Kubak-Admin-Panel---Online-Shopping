import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Environment } from "$lib/Env/Environment";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { ItemsBlocker } from "$lib/Models/Entities/ItemBlocker.Entity.Model";
import type { IItemsBlockerRepository } from "$lib/Repositories/Interface/I.ItemsBlocker.Repository";
import { Query } from "appwrite";

export class ItemsBlockerRepository implements IItemsBlockerRepository {
  async get(id: string): Promise<ItemsBlocker> {
    const itemBlocker: ItemsBlocker = (await Appwrite.databases.getDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_item_blocker,
      id
    )) as ItemsBlocker;
    return itemBlocker;
  }
  async getAll(orderId?: string): Promise<AppwriteResponse<ItemsBlocker>> {
    try {
      const query = this.filterQuery([], undefined, orderId);
      const { documents, total } = (await Appwrite.databases.listDocuments(
        Environment.appwrite_database,
        Environment.appwrite_collection_item_blocker,
        query
      )) as AppwriteResponse<ItemsBlocker>;
      return { documents, total };
    } catch (e) {
      throw e;
    }
  }
  async delete(id: string): Promise<void> {
    await Appwrite.databases.deleteDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_item_blocker,
      id
    );
  }
  private filterQuery(
    query: string[],
    options?: GenericListOptions,
    orderId?: string
  ): string[] {
    query = [
      Query.orderDesc(options?.sortField || "quantity"),
      Query.limit(options?.limit || 20),
    ];
    if (orderId) query.push(Query.equal("orderId", orderId));

    return query;
  }
}
