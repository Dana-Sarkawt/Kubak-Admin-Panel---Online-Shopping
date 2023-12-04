import type { ItemsBlocker } from '$lib/Models/Entities/ItemBlocker.Entity.Model';
import type { IItemsBlockerRepository } from '$lib/Repositories/Interface/I.ItemsBlocker.Repository';

export class ItemsBlockerRepository implements IItemsBlockerRepository {
    async get(id: string): Promise<ItemsBlocker> {
        throw new Error('Method not implemented.');
    }
    async getAll(orderId?: string): Promise<AppwriteResponse<ItemsBlocker>> {
        throw new Error('Method not implemented.');
    }
    async delete(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}