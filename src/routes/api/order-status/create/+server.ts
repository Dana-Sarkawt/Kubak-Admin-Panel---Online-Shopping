import { Environment } from "$lib/Env/Environment";
import type { RequestHandler } from "@sveltejs/kit";
import { Client, Databases, ID } from "node-appwrite";

const client = new Client()
  .setEndpoint(Environment.appwrite_endpoint)
  .setProject(Environment.appwrite_project)
  .setKey(Environment.appwrite_sdk_api_key);

const database = new Databases(client);

export const POST = (async ({ locals, params, request }) => {
    const { id,status }:{id:string,status:string} = await request.json();

    const response = await database.updateDocument(
        Environment.appwrite_database,
        Environment.appwrite_collection_order_status,
        id,
        {
            status:status
        }
    );

  return new Response("Good Job!");
}) satisfies RequestHandler;
