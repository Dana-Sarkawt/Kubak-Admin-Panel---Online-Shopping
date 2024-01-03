import type { DriverLocation } from "$lib/Models/Entities/DriverLocation.Entity.Model";

export interface IDriverLocationRepository {
    getDriverLocation(driverId: string): Promise<DriverLocation>;
    getAllDriverLocations(): Promise<AppwriteResponse<DriverLocation>>;
}