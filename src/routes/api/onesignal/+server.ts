import type { RequestHandler } from "@sveltejs/kit";
import * as OneSignal from "@onesignal/node-onesignal";
import { Environment } from "$lib/Env/Environment";

const configuration = OneSignal.createConfiguration({
  userKey: Environment.onesignal_user_auth_key,
  appKey: Environment.onesignal_rest_api_key,
});
const client = new OneSignal.DefaultApi(configuration);

export const POST = (async ({ locals, params, request }) => {
  const { userId, status, name } = await request.json();

  const notification = new OneSignal.Notification();
  notification.app_id = Environment.onesignal_app_id;

  // console.log("Created User: ", createdUser);
  // Name property may be required in some case, for instance when sending an SMS.
  notification.name = "order_status_update";
  notification.contents = {
    en: `Order Status Updated of User: ${name} to: ${status}`,
  };

  // required for Huawei
  notification.headings = {
    en: "Order Status Updated",
  };

  //   console.log(notification);
  notification.included_segments = ["Total Subscriptions"];

  const notificationResponse = await client.createNotification(notification);

  return new Response(JSON.stringify(notificationResponse));
}) satisfies RequestHandler;
