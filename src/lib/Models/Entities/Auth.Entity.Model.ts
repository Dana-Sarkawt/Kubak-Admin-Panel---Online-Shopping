import type {DatabaseAuth} from "$lib/Models/Extensions/Database.Extension.Model";

export interface Auth extends DatabaseAuth {
    accessedAt: string;
    email: string;
    emailVerification: boolean;
    labels: string[];
    name: string;
    passwordUpdate: string;
    phone: string;
    phoneVerification: boolean;
    prefs: {
        gender: number,
        image: string | null,
        birthday: Date | null
    } | null;
    registration: string;
    status: boolean;
}
