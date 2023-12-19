import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Driver } from "$lib/Models/Entities/Driver.Entity.Model";
import type { CreateDriverRequest } from "$lib/Models/Requests/CreateDriver.Request.Model";

export interface IDriversRepository {
  getDrivers(options?: GenericListOptions): Promise<AppwriteResponse<Driver>>;

  getDriver(id: string): Promise<Driver>;

  getDriversByIds(ids: string[]): Promise<Driver[]>; // get drivers by ids

  createDriver(driver: CreateDriverRequest): Promise<void>;

  updateDriver(driver: CreateDriverRequest): Promise<Driver>;

  deleteDriver(id: string): Promise<void>;
}
