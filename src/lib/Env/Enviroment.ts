export namespace Enviroment {
  let PROCESS: any;

  const ENVIROMENT = PROCESS?.env ? PROCESS.env : import.meta.env;

  // Appwrite Config
  export const appwrite_endpoint:string = ENVIROMENT.VITE_APPWRITE_ENDPOINT;
  export const appwrite_project:string = ENVIROMENT.VITE_APPWRITE_PROJECT;

  // Appwrite Database
  export const appwrite_database:string = ENVIROMENT.VITE_APPWRITE_DATABASE_ID;

  // Appwrite Collections
  export const appwrite_collection_card:string = ENVIROMENT.VITE_APPWRITE_CARD_ID;
  export const appwrite_collection_category:string =
    ENVIROMENT.VITE_APPWRITE_CATEGORY_ID;
  export const appwrite_collection_item:string = ENVIROMENT.VITE_APPWRITE_ITEM_ID;
  export const appwrite_collection_favorite:string =
    ENVIROMENT.VITE_APPWRITE_FAVORITE_ID;

  // Appwrite Storage
  export const appwrite_storage:string = ENVIROMENT.VITE_APPWRITE_STORAGE_ID;
}
