import type { Database } from "$lib/Models/Extensions/Database.Extension.Model";

export interface Driver extends Database {
  userId: string;
  onlineStatus: boolean;
  bikeAnnuity?: BikeAnnuity;
  passport?: Passport;
  deletedAt: Date | string | null;
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

interface Passport {
  passportNumber: string;
  passportImage: string;
}
