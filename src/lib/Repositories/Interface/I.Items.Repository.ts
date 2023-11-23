import type { Item } from "$lib/Models/Entities/Item.Entities.Model";
import type { CreateItemRequest } from "$lib/Models/Requests/CreateItem.Request";

export interface IItemsRepository {
  getItems(): Promise<AppwriteResponse<Item>>;

  getItem(id: string): Promise<Item>;

  createItem(item: CreateItemRequest): Promise<void>;

  updateItem(item: Item): Promise<Item>;
}
