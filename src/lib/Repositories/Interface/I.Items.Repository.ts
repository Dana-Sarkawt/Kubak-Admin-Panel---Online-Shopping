import type {Item} from "$lib/Models/Entities/Item.Entities.Model";

export interface IItemsRepository {
    getItems(): Promise<Item[]>;

    getItem(id: string): Promise<Item>;

    createItem(item: Item): Promise<Item>;

    updateItem(item: Item): Promise<Item>;
}