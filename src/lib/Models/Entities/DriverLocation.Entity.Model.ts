import type { Database } from "$lib/Models/Extensions/Database.Extension.Model";
import type { Driver } from "$lib/Models/Entities/Driver.Entity.Model";

export interface DriverLocation extends Database {
    driverId: string;
    drivers: Driver| null;
    latitude: number;
    longitude: number;
    deletedAt: Date | null;
}
