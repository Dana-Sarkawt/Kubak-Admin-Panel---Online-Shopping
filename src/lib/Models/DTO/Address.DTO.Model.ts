import type { Datetime } from "$lib/Models/Extensions/Datetime.Extention.Model";

export interface AddressDto extends Datetime{
    id:string,
    building:string | null,
    buildingType: string,
    latitude:number,
    longitude:number,
    note:string | null,
    street:string | null,
    deletedAt: Date | null,
    userId:string,
}