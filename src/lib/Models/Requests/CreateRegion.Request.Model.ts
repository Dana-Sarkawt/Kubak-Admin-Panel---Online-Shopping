import type { LngLat } from "$lib/Models/Common/LngLat.Common.Model";

export interface CreateRegionRequest {
    name: string;
    location: LngLat;
    boundary: LngLat[];
}

export interface RegionRequest {
    id?: string | null;
    name: string;
    location: string;
    boundary: string;
}