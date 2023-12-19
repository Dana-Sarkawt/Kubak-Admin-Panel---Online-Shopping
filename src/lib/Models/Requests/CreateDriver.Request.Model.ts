export interface CreateDriverRequest {
  userId: string;
  onlineStatus: boolean;
  bikeAnnuity?: CreateBikeAnnuityRequest;
  passport?: CreatePassportRequest;
  deletedAt: Date | string | null;
}

interface CreateBikeAnnuityRequest {
  model: string;
  year: string;
  color: string;
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
  bikeAnnuity?: BikeAnnuityRequest;
  passport?: PassportRequest;
  deletedAt: Date | string | null;
}

interface BikeAnnuityRequest {
  model: string;
  year: string;
  color: string;
  plateNumber: string;
  annuityImageFront: string;
  annuityImageBack: string;
}

interface PassportRequest {
  passportNumber: string;
  passportImage: string;
}
