import type { RequestHandler } from "@sveltejs/kit";
import * as OneSignal from "@onesignal/node-onesignal";
import { Environment } from "$lib/Env/Environment";

const configuration = OneSignal.createConfiguration({
  userKey: Environment.onesignal_user_auth_key,
  appKey: Environment.onesignal_app_id,
});
const client = new OneSignal.DefaultApi(configuration);

export const POST = (async ({ locals, params, request }) => {
  const notification = new OneSignal.Notification();
  notification.app_id = Environment.onesignal_app_id;
  // Name property may be required in some case, for instance when sending an SMS.
  notification.name = "test_notification_name";
  notification.contents = {
    en: "Gig'em Ags",
  };

  // required for Huawei
  notification.headings = {
    en: "Gig'em Ags",
  };

//   console.log(notification);
  

  const notificationResponse = await client.createNotification(notification);

  console.log("Notification ",notificationResponse);
  

const apps = await client.getApps();

// console.log(apps);

  return new Response(JSON.stringify(apps));
}) satisfies RequestHandler;
