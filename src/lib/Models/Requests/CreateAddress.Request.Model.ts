import type { BuildingType } from "$lib/Models/Enums/BuildingType.Enum.Model";

export interface CreateAddressRequest {
    id: string | null,
    building?: string,
    buildingType: BuildingType,
    latitude: number,
    longitude: number,
    note?: string,
    street?: string,
    userId: string,
}