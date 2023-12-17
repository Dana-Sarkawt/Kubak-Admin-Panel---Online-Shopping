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
      let query = this.filterQuery([], options);
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
        Query.isNull("deletedAt"),
      ]
    )) as AppwriteResponse<Item>;
    let items = documents as Item[];
    return items;
  }
  async createItem(item: CreateItemRequest): Promise<void> {
    try {
      const itemRequest: ItemRequest = {
        userId: item.userId as string,
        name: item.name,
        price: item.price,
        itemImage: item.image.url as string,
        productionDate: item.productionDate as Date,
        expiredDate: item.expiredDate as Date,
        quantity: item.quantity,
        detail: item.detail!,
        category: item.categoryId,
        categoryIds: item.categoryId,
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
  async updateItem(item: CreateItemRequest): Promise<Item> {
    const itemRequest: ItemRequest = {
      name: item.name,
      price: item.price,
      productionDate: item.productionDate as Date,
      expiredDate: item.expiredDate as Date,
      quantity: item.quantity,
      detail: item.detail as string,
      itemImage: item.image.url as string,
      userId: item.userId as string,
      category: item.categoryId,
    };
    try {
      const itemResult = (await Appwrite.databases.updateDocument(
        Environment.appwrite_database,
        Environment.appwrite_collection_item,
        item.id as string,
        itemRequest
      )) as Item;

      console.log("Item In repository", itemResult);

      return itemResult;
    } catch (e) {
      throw e;
    }
  }

  async deleteItem(id: string): Promise<void> {
    await Appwrite.databases.updateDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_item,
      id,
      {
        deletedAt: new Date(),
      }
    );
  }

  private filterQuery(query: string[], options?: GenericListOptions): string[] {
    query = [
      Query.orderDesc(options?.sortField || "$createdAt"),
      Query.limit(options?.limit || 8),
      Query.offset((options?.page! - 1 || 0) * (options?.limit || 8)),
      Query.isNull("deletedAt"),
      Query.select([
        "$id",
        "name",
        "price",
        "itemImage",
        "quantity",
        "$createdAt",
        "$updatedAt",
        "deletedAt",
        "numberOfSales",
      ]),
    ];
    if (options?.search) {
      query.push(Query.startsWith("name", options?.search));
    }
    if (options?.from && options?.to) {
      query.push(Query.between("$createdAt", options?.from, options?.to));
    }
    return query;
  }
}
