import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Environment } from "$lib/Env/Environment";
import type { Item } from "$lib/Models/Entities/Item.Entities.Model";
import { ID } from "appwrite";
import type { IItemsRepository } from "../Interface/I.Items.Repository";
import type { CreateItemRequest } from "$lib/Models/Requests/CreateItem.Request";

export class ItemsRepository implements IItemsRepository {
  async getItems(): Promise<AppwriteResponse<Item>> {
    let { documents, total } = (await Appwrite.databases.listDocuments(
      Environment.appwrite_database,
      Environment.appwrite_collection_item
    )) as AppwriteResponse<Item>;

    return { documents, total };
  }
  async getItem(id: string): Promise<Item> {
    return (await Appwrite.databases.getDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_item,
      id
    )) as Item;
  }
  async createItem(item: CreateItemRequest): Promise<void> {
    try {
      await Appwrite.databases.createDocument(
        Environment.appwrite_database,
        Environment.appwrite_collection_item,
        ID.unique(),
        {
          name: item.name,
          category: item.category,
          price: item.price,
          detail: item.detail,
          quantity: item.quantity,
          productionDate: item.productionDate,
          expiredDate: item.expireDate,
          itemImage: item.image.url,
          userId: item.userId,
        }
      );
    } catch (error: any) {
      console.log(error);
    }
  }
  updateItem(item: Item): Promise<Item> {
    throw new Error("Method not implemented.");
  }
}
