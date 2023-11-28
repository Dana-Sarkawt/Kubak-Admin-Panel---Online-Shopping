export namespace Environment {
  let PROCESS: any;

  const ENVIRONMENT = PROCESS?.env ? PROCESS.env : import.meta.env;

  // Appwrite Config
  export const appwrite_endpoint: string = ENVIRONMENT.VITE_APPWRITE_ENDPOINT;
  export const appwrite_project: string = ENVIRONMENT.VITE_APPWRITE_PROJECT;

  // Appwrite Database
  export const appwrite_database: string =
    ENVIRONMENT.VITE_APPWRITE_DATABASE_ID;

  // Appwrite Collections
  export const appwrite_collection_card: string =
    ENVIRONMENT.VITE_APPWRITE_CARD_ID;
  export const appwrite_collection_category: string =
    ENVIRONMENT.VITE_APPWRITE_CATEGORY_ID;
  export const appwrite_collection_item: string =
    ENVIRONMENT.VITE_APPWRITE_ITEM_ID;
  export const appwrite_collection_favorite: string =
    ENVIRONMENT.VITE_APPWRITE_FAVORITE_ID;
  export const appwrite_collection_address: string =
    ENVIRONMENT.VITE_APPWRITE_ADDRESS_ID;
  export const appwrite_collection_order: string =
    ENVIRONMENT.VITE_APPWRITE_ORDER_ID;

  // Appwrite Storage
  export const appwrite_storage: string = ENVIRONMENT.VITE_APPWRITE_STORAGE_ID;
}
