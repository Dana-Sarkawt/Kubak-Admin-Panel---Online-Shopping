import { StorageRepository } from "$lib/Repositories/Implementation/Storage.repository";

const storageRepository = new StorageRepository();

export async function ImageToUrl(file:File) {
    const storedImage = await storageRepository.createFile(file);
    const url = await storageRepository.getFile(storedImage.$id);
    return url;
}