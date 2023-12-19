import type { Datetime } from "../Extensions/Datetime.Extention.Model";

export interface DriverDto extends Datetime {
    id: string;
    userId: string;
    onlineStatus: boolean;
    bikeAnnuity?: BikeAnnuityDto;
    passport?: PassportDto;
}

interface BikeAnnuityDto {
    model: string;
    year: number;
    color: string;
    plateImage: string;
    plateNumber: string;
    annuity:{
        image:{
            front: string;
            back: string;
        },
        number: string;
    }
}

interface PassportDto {
    passportNumber: string;
    passportImage: string;
}