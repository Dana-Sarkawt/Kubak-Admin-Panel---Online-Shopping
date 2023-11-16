export namespace Enviroment {
  let PROCESS: any;

  const ENVIROMENT = PROCESS?.env ? PROCESS.env : import.meta.env;

  // Appwrite Config
  export const appwrite_endpoint = ENVIROMENT.VITE_APPWRITE_ENDPOINT;
  export const appwrite_project = ENVIROMENT.VITE_APPWRITE_PROJECT;

  // Appwrite Database
  export const appwrite_database = ENVIROMENT.VITE_APPWRITE_DATABASE_ID;

  // Appwrite Collections
  export const appwrite_collection_card = ENVIROMENT.VITE_APPWRITE_CARD_ID;
  export const appwrite_collection_category =
    ENVIROMENT.VITE_APPWRITE_CATEGORY_ID;
  export const appwrite_collection_item = ENVIROMENT.VITE_APPWRITE_ITEM_ID;
  export const appwrite_collection_favorite =
    ENVIROMENT.VITE_APPWRITE_FAVORITE_ID;
}
