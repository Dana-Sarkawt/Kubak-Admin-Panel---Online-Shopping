import { Environment } from "$lib/Env/Environment";
import type { RequestHandler } from "@sveltejs/kit";
import { Client, Databases, ID } from "node-appwrite";
import * as turf from "@turf/turf";
import type {
  CreateRegionRequest,
  RegionRequest,
} from "$lib/Models/Requests/CreateRegion.Request";

const client = new Client()
  .setEndpoint(Environment.appwrite_endpoint)
  .setProject(Environment.appwrite_project)
  .setKey(Environment.appwrite_sdk_api_key);

const database = new Databases(client);

export const POST = (async ({ locals, params, request }) => {
  const { name, location, boundary }: CreateRegionRequest =
    await request.json();

  const coordinates = boundary.map((x) => [x.lng, x.lat]);

  const locationPoint = turf.point([location.lng, location.lat]);
  const boundaryPolygon = turf.polygon([coordinates]);

  // Ensure the first and last coordinates are the same for a valid Polygon
  if (
    coordinates.length > 0 &&
    (coordinates[0][0] !== coordinates[coordinates.length - 1][0] ||
      coordinates[0][1] !== coordinates[coordinates.length - 1][1])
  ) {
    coordinates.push(coordinates[0]);
  }

  const region: RegionRequest = {
    name: name,
    location: JSON.stringify(locationPoint), // Serialize the Point
    boundary: JSON.stringify(boundaryPolygon), // Serialize the Polygon
  };

  const response = await database.createDocument(
    Environment.appwrite_database,
    Environment.appwrite_collection_region,
    ID.unique(),
    region
  );

  return new Response(response.$id);
}) satisfies RequestHandler;
