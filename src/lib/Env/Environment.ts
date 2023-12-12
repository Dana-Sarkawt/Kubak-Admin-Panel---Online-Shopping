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
  export const appwrite_collection_item_blocker: string =
    ENVIRONMENT.VITE_APPWRITE_ITEM_BLOCKER_ID;

  // Appwrite Storage
  export const appwrite_storage: string = ENVIRONMENT.VITE_APPWRITE_STORAGE_ID;

  // Appwrite Functions
  export const appwrite_function_create_order: string =
    ENVIRONMENT.VITE_APPWRITE_FUNCTION_CREATE_ORDER_ID;
  export const appwrite_function_get_all_users: string =
    ENVIRONMENT.VITE_APPWRITE_FUNCTION_GET_ALL_USERS_ID;
  export const appwrite_function_check_cards_expiration: string =
    ENVIRONMENT.VITE_APPWRITE_FUNCTION_CHECK_CARDS_EXPIRATION_ID;
  export const appwrite_function_get_user: string =
    ENVIRONMENT.VITE_APPWRITE_FUNCTION_GET_USER_BY_ID_ID;

  // Onesignal Config
  export const onesignal_app_id: string = ENVIRONMENT.VITE_ONESIGNAL_APP_ID;
  export const onesignal_rest_api_key: string = ENVIRONMENT.VITE_ONESIGNAL_REST_API_KEY;
  export const onesignal_user_auth_key: string = ENVIRONMENT.VITE_ONESIGNAL_USER_AUTH_KEY;

  // Valhalla Config
  export const valhalla_endpoint: string = ENVIRONMENT.VITE_VALHALLA_ENDPOINT;
}
