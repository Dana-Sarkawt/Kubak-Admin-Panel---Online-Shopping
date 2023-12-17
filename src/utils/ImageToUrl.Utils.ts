import { StorageRepository } from "$lib/Repositories/Implementation/Storage.repository";

const storageRepository = new StorageRepository();

export async function ImageToUrl(file:File) {
    try{
        const storedImage = await storageRepository.createFile(file);
        const url = await storageRepository.getFile(storedImage.$id);
        return url;
    }catch(error){
        console.log(error);
    }
}