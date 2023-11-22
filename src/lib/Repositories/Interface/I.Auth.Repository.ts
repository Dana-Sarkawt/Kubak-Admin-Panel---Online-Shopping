import type {Auth} from "$lib/Models/Entities/Auth.Entity.Model";

export interface IAuthRepository {
    getAuth(): Promise<Auth>;

    signIn(phone: string): Promise<string>;

    signOut(): Promise<void>;

    secret(userId: string, secret: string): Promise<Auth>;
} 