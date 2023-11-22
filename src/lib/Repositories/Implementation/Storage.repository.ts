import {ID, type Models} from 'appwrite';
import type {IStorageRepository} from '../Interface/I.Storage.repository';
import {Appwrite} from '$lib/Appwrite/Appwrite';
import {Environment} from '$lib/Env/Environment';

export class StorageRepository implements IStorageRepository {
    async createFile(file: File): Promise<Models.File> {
		return await Appwrite.storage.createFile(Environment.appwrite_storage, ID.unique(), file);
    }

    async getFile(id: string): Promise<string> {
        const url = Appwrite.storage.getFileView(Environment.appwrite_storage, id);
        return url.href;
    }
}
