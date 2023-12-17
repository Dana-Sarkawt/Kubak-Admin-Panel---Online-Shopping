import type { RequestHandler } from "@sveltejs/kit";
import * as admin from "firebase-admin";
import serviceAccountJSON from "$lib/Firebase/service/online-shopping-f5190-firebase-adminsdk-hezqi-5e96539d35.json";
import { Environment } from "$lib/Env/Environment";
import { OrderStatus } from "$lib/Models/Enums/Order-Status.Enum.Model";

const serviceAccount = JSON.parse(JSON.stringify(serviceAccountJSON));

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: Environment.firebase_endpoint,
  });
}

export const POST = (async ({ locals, params, request }) => {
  const {
    userId,
    status,
    name,
    fcmToken,
  }: {
    userId: string;
    status: string;
    name: string;
    fcmToken: string;
  } = await request.json();

  // Check if the user document exists
  const userDoc = admin.firestore().collection("users").doc(userId);
  const doc = await userDoc.get();

  console.log("User Doc", doc);

  // If the user document doesn't exist, create it
  if (!doc.exists) {
    await userDoc.set({ name: name });
  }

  const tokens = await userDoc.collection("tokens").get();
  const userTokens = tokens.docs.map((token) => token.data().id);

  // Check if there are any tokens
  if (userTokens.length === 0) {
    console.warn("No tokens found for user:", userId);
    if (!fcmToken)
      return new Response(
        JSON.stringify({ success: false, message: "No tokens found for user" })
      );
    await admin
      .firestore()
      .collection("users")
      .doc(userId)
      .collection("tokens")
      .add({ id: fcmToken });
    userTokens.push(fcmToken);
  }

  let title = "Order Status";
  let body = `Your order status ${
    status === OrderStatus[OrderStatus.Failed] ? "Has Failed" : `is ${status}`
  }`;

  // Create the messages
  const messages = userTokens.map((token) => ({
    token,
    notification: {
      title,
      body,
    },
    data: {
      status,
      title,
      message: body,
    },
  }));

  // Check if messages array is not empty
  if (messages.length === 0) {
    console.warn("No messages to send");
    return new Response(
      JSON.stringify({ success: false, message: "No messages to send" })
    );
  }

  // Send the notifications
  try {
    await admin.messaging().sendEach(messages);
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send messages" })
    );
  }

  return new Response(JSON.stringify({ success: true }));
}) satisfies RequestHandler;
