import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Environment } from "$lib/Env/Environment";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Driver } from "$lib/Models/Entities/Driver.Entity.Model";
import type {
  BikeAnnuityRequest,
  CreateDriverRequest,
  DriverRequest,
} from "$lib/Models/Requests/CreateDriver.Request.Model";
import type { IDriversRepository } from "$lib/Repositories/Interface/I.Drivers.Repository";
import { ID, Query } from "appwrite";
export class DriverRepository implements IDriversRepository {
  async getDrivers(
    options?: GenericListOptions | undefined
  ): Promise<AppwriteResponse<Driver>> {
    const query = this.filterQuery([], options);

    let { documents, total } = (await Appwrite.databases.listDocuments(
      Environment.appwrite_database_drivers,
      Environment.appwrite_collection_driver,
      query
    )) as AppwriteResponse<Driver>;

    return { documents, total };
  }
  async getDriver(id: string): Promise<Driver> {
    const driver = (await Appwrite.databases.getDocument(
      Environment.appwrite_database_drivers,
      Environment.appwrite_collection_driver,
      id
    )) as Driver;
    return driver;
  }
  async getDriversByIds(ids: string[]): Promise<Driver[]> {
    let drivers = ids.map((id) => this.getDriver(id));
    return Promise.all(drivers);
  }
  async createDriver(driver: CreateDriverRequest): Promise<void> {
    const bikeRequest: BikeAnnuityRequest = {
      model: driver.bikeAnnuity.model,
      year: driver.bikeAnnuity.year,
      color: driver.bikeAnnuity.color,
      plateImage: driver.bikeAnnuity.plateImage.url as string,
      plateNumber: driver.bikeAnnuity.plateNumber,
      annuityImageFront: driver.bikeAnnuity.annuityImage.front.url as string,
      annuityImageBack: driver.bikeAnnuity.annuityImage.back.url as string,
      annuityNumber: driver.bikeAnnuity.annuityNumber,
    };

    const bikeAnnuity = await Appwrite.databases.createDocument(
      Environment.appwrite_database_drivers,
      Environment.appwrite_collection_bike_annuity,
      ID.unique(),
      bikeRequest
    );

    const driverRequest: DriverRequest = {
      userId: driver.userId as string,
      onlineStatus: driver.onlineStatus,
      bikes: bikeAnnuity.$id as string,
      passportNumber: driver.passport.passportNumber,
      passportImage: driver.passport.passportImage.url as string,
      deletedAt: driver.deletedAt,
    };
    await Appwrite.databases.createDocument(
      Environment.appwrite_database_drivers,
      Environment.appwrite_collection_driver,
      ID.unique(),
      driverRequest
    );

    await Appwrite.functions.createExecution(
      Environment.appwrite_function_update_user,
      JSON.stringify({ userId: driver.userId, labels: driver.labels }),
      false,
      "/",
      "GET"
    );
  }
  async updateDriver(driver: CreateDriverRequest): Promise<Driver> {
    const driverRequest: DriverRequest = {
      userId: driver.userId as string,
      onlineStatus: driver.onlineStatus,
      bikes: "",
      passportNumber: driver.passport.passportNumber,
      passportImage: driver.passport.passportImage.url as string,
    };
    const result = await Appwrite.databases.updateDocument(
      Environment.appwrite_database_drivers,
      Environment.appwrite_collection_driver,
      driver.id as string,
      driverRequest
    );

    return result as Driver;
  }
  async deleteDriver(id: string): Promise<void> {
    await Appwrite.databases.updateDocument(
      Environment.appwrite_database_drivers,
      Environment.appwrite_collection_driver,
      id,
      {
        deletedAt: new Date(),
      }
    );
  }

  private filterQuery(query: string[], options?: GenericListOptions): string[] {
    query = [
      Query.orderDesc(options?.sortField || "$createdAt"),
      Query.limit(options?.limit || 8),
      Query.offset((options?.page! - 1 || 0) * (options?.limit || 7)),
      Query.isNull("deletedAt"),
    ];
    if (options?.search) {
      query.push(Query.startsWith("name", options?.search));
    }
    if (options?.from && options?.to) {
      query.push(Query.between("$createdAt", options?.from, options?.to));
    }
    if (options?.driverCheck) {
      query.push(Query.equal("onlineStatus", options?.driverCheck));
    }
    return query;
  }
}
