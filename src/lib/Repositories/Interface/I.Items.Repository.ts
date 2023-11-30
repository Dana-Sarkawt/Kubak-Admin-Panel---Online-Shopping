import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Item } from "$lib/Models/Entities/Item.Entities.Model";
import type { CreateItemRequest } from "$lib/Models/Requests/CreateItem.Request";
import type { RequestSelectedItems } from "$lib/Models/Requests/CreateOrder.Request";

export interface IItemsRepository {
  getItems(options:GenericListOptions): Promise<AppwriteResponse<Item>>;

  getItem(id: string): Promise<Item>;

  getItemsByIds(ids:string[]): Promise<Item[]> 

  createItem(item: CreateItemRequest): Promise<void>;

  updateItem(item: Item): Promise<Item>;
}
