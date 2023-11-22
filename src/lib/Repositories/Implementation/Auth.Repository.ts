import { Appwrite } from "$lib/Appwrite/Appwrite";
import type { Auth } from "$lib/Models/Entities/Auth.Entity.Model";
import type { IAuthRepository } from "$lib/Repositories/Interface/I.Auth.Repository";
import { ID } from "appwrite";

export class AuthRepository implements IAuthRepository {
  async getAuth(): Promise<Auth> {
    return await Appwrite.account.get() as Auth;
  }
  async signIn(phone: string): Promise<string> {
    const result = await Appwrite.account.createPhoneSession(
      ID.unique(),
      phone
    );
    return result.userId;
  }
  signOut(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async secret(userId: string, secret: string): Promise<Auth> {
    await Appwrite.account.updatePhoneSession(userId, secret);
    return await Appwrite.account.get() as Auth;
  }
}
