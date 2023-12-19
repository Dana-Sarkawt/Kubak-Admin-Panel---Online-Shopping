export namespace Environment {
  let PROCESS: any;

  const ENVIRONMENT = PROCESS?.env ? PROCESS.env : import.meta.env;

  // Appwrite Config
  export const appwrite_endpoint: string = ENVIRONMENT.VITE_APPWRITE_ENDPOINT;
  export const appwrite_project: string = ENVIRONMENT.VITE_APPWRITE_PROJECT;
  export const appwrite_sdk_api_key: string =
    ENVIRONMENT.VITE_APPWRITE_SDK_API_KEY;

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
  export const appwrite_collection_region: string =
    ENVIRONMENT.VITE_APPWRITE_REGION_ID;
  export const appwrite_collection_driver: string =
    ENVIRONMENT.VITE_APPWRITE_DRIVER_ID;
  export const appwrite_collection_bike_annuity: string =
    ENVIRONMENT.VITE_APPWRITE_BIKE_ID;

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
  export const appwrite_function_order_notification: string = ENVIRONMENT.VITE_APPWRITE_FUNCTION_ORDER_NOTIFICATION_ID;

  // Onesignal Config
  export const onesignal_app_id: string = ENVIRONMENT.VITE_ONESIGNAL_APP_ID;
  export const onesignal_rest_api_key: string =
    ENVIRONMENT.VITE_ONESIGNAL_REST_API_KEY;
  export const onesignal_user_auth_key: string =
    ENVIRONMENT.VITE_ONESIGNAL_USER_AUTH_KEY;

  // Valhalla Config
  export const valhalla_endpoint: string = ENVIRONMENT.VITE_VALHALLA_ENDPOINT;

  // Mapbox Config
  export const mapbox_access_token: string =
    ENVIRONMENT.VITE_MAPBOX_ACCESS_TOKEN;
  export const mapbox_style_streets: string =
    ENVIRONMENT.VITE_MAPBOX_STYLE_STREETS;
  export const mapbox_style_satellite_streets: string =
    ENVIRONMENT.VITE_MAPBOX_STYLE_SATELLITE_STREETS;
  export const mapbox_style_light: string = ENVIRONMENT.VITE_MAPBOX_STYLE_LIGHT;
  export const mapbox_style_dark: string = ENVIRONMENT.VITE_MAPBOX_STYLE_DARK;

  // Firebase Config
  export const firebase_endpoint: string = ENVIRONMENT.VITE_FIREBASE_ENDPOINT;
}
