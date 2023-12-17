import type { ItemsBlocker } from "$lib/Models/Entities/ItemBlocker.Entity.Model";

export interface IItemsBlockerRepository {
    get(id: string): Promise<ItemsBlocker>;
    getAll(orderId?: string): Promise<AppwriteResponse<ItemsBlocker>>;
    delete(id:string): Promise<void>;
}