export interface LngLat {
    lng: number,
    lat: number,
}

export interface Direction {
    route:string,
    routeLngLat?:LngLat[],
    distance:number,
    duration:number,
}