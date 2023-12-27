import type { Datetime } from "$lib/Models/Extensions/Datetime.Extention.Model";
import type { DriverDto } from "./Driver.DTO.Model";

export interface DriverLocationDto extends Datetime{
    id: string;
    driverId: string;
    latitude: number;
    longitude: number;
    driver: DriverDto | null;
}