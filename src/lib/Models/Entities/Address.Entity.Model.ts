import type { Database } from "$lib/Models/Extensions/Database.Extension.Model";
import type { BuildingType } from "$lib/Models/Enums/BuildingType.Enum.Model";

export interface Address extends Database{
    building:string | null,
    buildingType: BuildingType,
    latitude:number,
    longitude:number,
    note:string | null,
    street:string | null,
    deletedAt: Date | null
    userId:string,
}