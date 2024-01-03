import type { Database } from "$lib/Models/Extensions/Database.Extension.Model";
import type { DriverLocation } from "./DriverLocation.Entity.Model";

export interface Driver extends Database {
  userId: string;
  onlineStatus: boolean;
  bikes?: BikeAnnuity;
  passportNumber: string;
  passportImage: string;
  deletedAt: Date | string | null;
  driverLocation: DriverLocation;
  driverLocationId: string;
}

interface BikeAnnuity {
  model: string;
  year: number;
  color: string;
  plateImage: string;
  plateNumber: string;
  annuityImageFront: string;
  annuityImageBack: string;
  annuityNumber: string;
}

// interface Passport {
//   passportNumber: string;
//   passportImage: string;
// }
