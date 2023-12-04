import { Appwrite } from '$lib/Appwrite/Appwrite';
import { Environment } from '$lib/Env/Environment';
import type { ItemsBlocker } from '$lib/Models/Entities/ItemBlocker.Entity.Model';
import type { IItemsBlockerRepository } from '$lib/Repositories/Interface/I.ItemsBlocker.Repository';
import { Query } from 'appwrite';

export class ItemsBlockerRepository implements IItemsBlockerRepository {
    async get(id: string): Promise<ItemsBlocker> {
        const itemBlocker:ItemsBlocker = await Appwrite.databases.getDocument(
            Environment.appwrite_database,
            Environment.appwrite_collection_item_blocker,
            id
        ) as ItemsBlocker;
        return itemBlocker;
    }
    async getAll(orderId?: string): Promise<AppwriteResponse<ItemsBlocker>> {
        const { documents, total } = await Appwrite.databases.listDocuments(
            Environment.appwrite_database,
            Environment.appwrite_collection_item_blocker,
            [
                orderId ? Query.equal('orderId', orderId) : "",
                Query.limit(20)
            ]
        ) as AppwriteResponse<ItemsBlocker>;
        return { documents, total };
    }
    async delete(id: string): Promise<void> {
        await Appwrite.databases.deleteDocument(
            Environment.appwrite_database,
            Environment.appwrite_collection_item_blocker,
            id
        );
    }
}