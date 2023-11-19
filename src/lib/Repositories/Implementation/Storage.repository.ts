import { ID, type Models } from 'appwrite';
import type { IStorageRepository } from '../Interface/I.Storage.repository';
import { Appwrite } from '$lib/Appwrite/Appwrite';
import { Enviroment } from '$lib/Env/Enviroment';

export class StorageRepository implements IStorageRepository {
	async createFile(file: File): Promise<Models.File> {
		const image = await Appwrite.storage.createFile(Enviroment.appwrite_storage, ID.unique(), file);
        return image;
	}
	async getFile(id: string): Promise<string> {
		const url = Appwrite.storage.getFileView(Enviroment.appwrite_storage, id);
		return url.href;
	}
}
