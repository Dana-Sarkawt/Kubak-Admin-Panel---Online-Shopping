import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Item } from "$lib/Models/Entities/Item.Entities.Model";
import type { CreateItemRequest } from "$lib/Models/Requests/CreateItem.Request.Model";

export interface IItemsRepository {
  getItems(options:GenericListOptions): Promise<AppwriteResponse<Item>>;

  getItem(id: string): Promise<Item>;

  getItemsByIds(ids:string[]): Promise<Item[]> 

  createItem(item: CreateItemRequest): Promise<void>;

  updateItem(item: CreateItemRequest): Promise<Item>;

  deleteItem(id: string): Promise<void>;
}
