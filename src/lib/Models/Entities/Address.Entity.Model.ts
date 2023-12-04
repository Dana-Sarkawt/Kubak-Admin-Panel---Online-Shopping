import type { Database } from "$lib/Models/Extensions/Database.Extension.Model";

export interface Address extends Database{
    building:string | null,
    buildingType: string,
    latitude:number,
    longitude:number,
    note:string | null,
    street:string | null,
    deletedAt: Date | null
    userId:string,
}