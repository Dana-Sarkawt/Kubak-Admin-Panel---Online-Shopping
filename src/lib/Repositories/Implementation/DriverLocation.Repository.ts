import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Environment } from "$lib/Env/Environment";
import type { DriverLocation } from "$lib/Models/Entities/DriverLocation.Entity.Model";
import type { IDriverLocationRepository } from "$lib/Repositories/Interface/I.DriverLocation.Repository";
import { Query } from "appwrite";

export class DriverLocationRepository implements IDriverLocationRepository {
  async getAllDriverLocations(): Promise<AppwriteResponse<DriverLocation>> {
    try {
      const { documents, total } = (await Appwrite.databases.listDocuments(
        Environment.appwrite_database_drivers,
        Environment.appwrite_collection_driver_location,
        [Query.isNull("deletedAt")]
        )) as AppwriteResponse<DriverLocation>;

      return { documents, total };
    } catch (error) {
      throw error;
    }
  }
  async getDriverLocation(id: string): Promise<DriverLocation> {
    try {
      const document = (await Appwrite.databases.getDocument(
        Environment.appwrite_database_drivers,
        Environment.appwrite_collection_driver_location,
        id,
        [Query.isNull("deletedAt")]
        )) as DriverLocation;
        return document;
    } catch (error) {
      throw error;
    }
  }
}
