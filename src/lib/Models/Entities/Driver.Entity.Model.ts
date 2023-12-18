import type { Database } from "../Extensions/Database.Extension.Model";

export interface Driver extends Database {
    userId: string,
    onlineStatus: boolean,
    bikeAnnuity?: BikeAnnuity,
    passport?: Passaport,
    deletedAt: Date | string | null,
}

interface BikeAnnuity {
    bikeModel: string,
    bikeYear: string,
    bikeColor: string,
    bikePlateNumber: string,
}

interface Passaport {
    passaportNumber: string,
    passaportImage: string,
}