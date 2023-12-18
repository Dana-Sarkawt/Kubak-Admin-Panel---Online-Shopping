export interface CreateValhallaRoutingRequest {
    locations: ValhallaLocation[],
    costing: string,
    units: string,
    excludePolygon?: number[],
}

interface ValhallaLocation{
    lat: number,
    lon: number,
    heading?: number,
}