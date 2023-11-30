import { Appwrite } from "$lib/Appwrite/Appwrite";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import type { Auth } from "$lib/Models/Entities/Auth.Entity.Model";
import type { AuthRequest, CreateAuthRequest } from "$lib/Models/Requests/CreateAuth.Request";
import type { IAuthRepository } from "$lib/Repositories/Interface/I.Auth.Repository";
import { ID } from "appwrite";

export class AuthRepository implements IAuthRepository {
  async getAuth(): Promise<Auth | null> {
    try {
      return (await Appwrite.account.get()) as Auth;
    } catch (error: any) {
      if (error && error.code === 401) {
        // Return null if unauthorized
        return null;
      }
      throw error;
    }
  }
  async signIn(phone: string): Promise<string> {
    const result = await Appwrite.account.createPhoneSession(
      ID.unique(),
      phone
      );
      return result.userId;
    }
    async signOut(): Promise<void> {
      await Appwrite.account.deleteSession("current");
    }
    async secret(userId: string, secret: string): Promise<Auth> {
      await Appwrite.account.updatePhoneSession(userId, secret);
      return (await Appwrite.account.get()) as Auth;
    }
    async update(auth: CreateAuthRequest): Promise<void> {
      const options: AuthRequest = {
        id: auth.id,
        name: auth.name as string,
        prefs:{
          gender:auth.prefs?.gender as number,
          birthday:auth.prefs?.birthday as Date,
          image: auth.prefs?.image.url as string,
        }
      }

      const optionsUpdated = await this.filterUpdatingOptions(options);
    }
    async listUsers(
    options?: GenericListOptions
  ): Promise<AppwriteResponse<Auth>> {
    const result = await Appwrite.functions.createExecution(
      "65646f325c51e338c6b8",
      JSON.stringify(options),
      false,
      "/",
      "GET"
    );
    const documents = JSON.parse(result.responseBody).users;
    const total = JSON.parse(result.responseBody).total;

    const users: AppwriteResponse<Auth> = { documents, total };
    return users;
  }

  private async filterUpdatingOptions(options?: AuthRequest): Promise<AuthRequest>{

    if(options?.name != ""){
      await Appwrite.account.updateName(options?.name as string);
    }
    if(options?.prefs.image === ""){
      options!.prefs.image = (await Appwrite.account.getPrefs()).image;
    }
    if(options?.prefs.gender === 0){
      options!.prefs.gender = (await Appwrite.account.getPrefs()).gender;
    }
    if(options?.prefs.birthday){
      options!.prefs.birthday = (await Appwrite.account.getPrefs()).birthday;
    }

    return options as AuthRequest;
  }
}
