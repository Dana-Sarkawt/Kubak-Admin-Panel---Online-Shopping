export interface LngLat {
    lng: number,
    lat: number,
}

export interface Direction {
    route:string | LngLat[],
    distance:number,
    duration:number,
}