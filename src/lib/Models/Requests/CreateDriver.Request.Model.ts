export interface CreateDriverRequest {
  id?: string | null;
  userId: string;
  onlineStatus: boolean;
  bikeAnnuity: CreateBikeAnnuityRequest;
  passport: CreatePassportRequest;
  deletedAt?: Date | string | null;
}

interface CreateBikeAnnuityRequest {
  model: string;
  year: number;
  color: string;
  plateImage: {
    url: string | File;
    localUrl?: string | null;
  }
  plateNumber: string;
  annuityImage: {
    front: {
      url: string | File;
      localUrl?: string | null;
    };
    back: {
      url: string | File;
      localUrl?: string | null;
    };
  };
  annuityNumber: string;
}

interface CreatePassportRequest {
  passportNumber: string;
  passportImage: {
    url: string | File;
    localUrl?: string | null;
  };
}

export interface DriverRequest {
  userId: string;
  onlineStatus: boolean;
  bikes?: string;
  passportNumber: string;
  passportImage: string;
  deletedAt?: Date | string | null;
}

export interface BikeAnnuityRequest {
  model: string;
  year: number;
  color: string;
  plateImage: string;
  plateNumber: string;
  annuityImageFront: string;
  annuityImageBack: string;
  annuityNumber: string;
}
