import type { Models } from "appwrite";

export interface IStorageRepository {
    createFile(file:File): Promise<Models.File>;
    getFile(id: string): Promise<string>;
}