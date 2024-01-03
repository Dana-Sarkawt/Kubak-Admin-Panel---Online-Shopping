import type { Database } from "$lib/Models/Extensions/Database.Extension.Model";

export interface DriverLocation extends Database {
    latitude: number;
    longitude: number;
    deletedAt: Date | null;
}
