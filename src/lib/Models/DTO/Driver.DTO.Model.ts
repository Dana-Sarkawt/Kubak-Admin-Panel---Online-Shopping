import type { Datetime } from "$lib/Models/Extensions/Datetime.Extention.Model";
import type { AuthDto } from "$lib/Models/DTO/Auth.DTO.Model";
import type { DriverLocationDto } from "./DriverLocation.DTO.Model";

export interface DriverDto extends Datetime {
    id: string;
    userId: string;
    user: AuthDto | null;
    onlineStatus: boolean;
    bikeAnnuity?: BikeAnnuityDto;
    passport?: PassportDto;
    driverLocation: DriverLocationDto | null;
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