import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Environment } from "$lib/Env/Environment";
import type { Item } from "$lib/Models/Entities/Item.Entities.Model";
import { ID, Query } from "appwrite";
import type { IItemsRepository } from "../Interface/I.Items.Repository";
import type {
  CreateItemRequest,
  ItemRequest,
} from "$lib/Models/Requests/CreateItem.Request";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";


export class ItemsRepository implements IItemsRepository {
  async getItems(
    options?: GenericListOptions
  ): Promise<AppwriteResponse<Item>> {
    try {
    } catch (error) {}
    try {
      let query = [
        Query.orderDesc(options?.sortField || "$createdAt"),
        Query.limit(options?.limit || 8),
        Query.offset((options?.page! - 1 || 0) * (options?.limit || 8)),
        Query.isNull("deletedAt"),
        Query.select(["$id" ,"name", "price", "itemImage", "quantity", "$createdAt", "$updatedAt", "deletedAt"]),
      ];
      let { documents, total } = (await Appwrite.databases.listDocuments(
        Environment.appwrite_database,
        Environment.appwrite_collection_item,
        query
      )) as AppwriteResponse<Item>;

      return { documents, total };
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async getItem(id: string): Promise<Item> {
    return (await Appwrite.databases.getDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_item,
      id
    )) as Item;
  }

  async getItemsByIds(ids: string[]): Promise<Item[]> {
    const { documents, total } = (await Appwrite.databases.listDocuments(
      Environment.appwrite_database,
      Environment.appwrite_collection_item,
      [
        Query.equal("$id", ids),
        Query.limit(ids.length),
        Query.offset(0),
        Query.isNull("deletedAt"),
      ]
    )) as AppwriteResponse<Item>;
    let items = documents as Item[];



    return items;
  }
  async createItem(item: CreateItemRequest): Promise<void> {
    try {
      const itemRequest: ItemRequest = {
        userId: item.userId,
        name: item.name,
        price: item.price,
        itemImage: item.image.url as string,
        productionDate: item.productionDate,
        expiredDate: item.expiredDate,
        quantity: item.quantity,
        detail: item.detail!,
        category: item.categoryId,
      };

      await Appwrite.databases.createDocument(
        Environment.appwrite_database,
        Environment.appwrite_collection_item,
        ID.unique(),
        itemRequest
      );
    } catch (error: any) {
      console.log(error);
    }
  }
  updateItem(item: Item): Promise<Item> {
    throw new Error("Method not implemented.");
  }
}
