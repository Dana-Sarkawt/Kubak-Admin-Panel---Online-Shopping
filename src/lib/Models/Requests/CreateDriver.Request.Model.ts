export interface CreateDriverRequest {
    userId: string;
    onlineStatus: boolean;
    bikeAnnuity?: BikeAnnuity;
    passport?: Passaport;
    deletedAt: Date | string | null;
}