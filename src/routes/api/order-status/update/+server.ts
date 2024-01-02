import { Environment } from "$lib/Env/Environment";
import type { RequestHandler } from "@sveltejs/kit";
import { Client, Databases, ID } from "node-appwrite";
import AsyncLock from "async-lock";

const lock = new AsyncLock();

const client = new Client()
  .setEndpoint(Environment.appwrite_endpoint)
  .setProject(Environment.appwrite_project)
  .setKey(Environment.appwrite_sdk_api_key);

const database = new Databases(client);

export const POST = (async ({ locals, params, request }) => {
  const { id, status }: { id: string; status: string } = await request.json();

  lock.acquire(id, async function (done) {
    await database.updateDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_order_status,
      id,
      {
        status: status,
      }
    );
    done();
  });

  return new Response(`Order Has Been ${status}`);
}) satisfies RequestHandler;
