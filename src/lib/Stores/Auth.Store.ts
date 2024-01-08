import { goto } from "$app/navigation";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { AuthDto } from "$lib/Models/DTO/Auth.DTO.Model";
import { Roles } from "$lib/Models/Enums/Roles.Enum.Model";
import type { CreateAuthRequest } from "$lib/Models/Requests/CreateAuth.Request.Model";
import { AuthRepository } from "$lib/Repositories/Implementation/Auth.Repository";
import { writable } from "svelte/store";
import { ImageToUrl } from "../../utils/ImageToUrl.Utils";

const authRepository = new AuthRepository();

const errors: string[] = [];

const createAuthStore = () => {
  const { subscribe, set, update } = writable<AuthDto | null>();
  return {
    subscribe,
    set: (auth: AuthDto) => set(auth),
    get: async () => {
      try {
        const user = await authRepository.getAuth();

        if (!user) {
          errors.push("No User Was Found");
          throw new Error("No User Was Found");
        }
        const userDto: AuthDto = Dto.ToAuthDto(user);

        set(userDto);
      } catch (error) {
        console.log(error);
        set(null);
        goto("/login");
        return errors;
      }
    },

    signIn: async (phone: string) => {
      try {
        const userId = await authRepository.signIn(phone);
        if (!userId) {
          errors.push(`No User Was Found By This Phone Number : ${phone}`);
          throw new Error(`No User Was Found By This Phone Number : ${phone}`);
        }

        return userId;
      } catch (error) {
        console.log("Error", error);
        return errors;
      }
    },

    signInWithEmailAndPassword: async (email: string, password: string) => {
      try {
        await authRepository.signInWithEmailAndPassword(email, password);
        authStore.get();
        goto("/");
      } catch (error) {
        console.log("Error", error);
        return errors;
      }
    },

    secret: async (userId: string, secret: string) => {
      try {
        const user = await authRepository.secret(userId, secret);
        if (
          user.labels.includes(Roles[Roles.SuperAdmin]) ||
          user.labels.includes(Roles[Roles.Admin])
        ) {
          const userDto: AuthDto = Dto.ToAuthDto(user);

          set(userDto);
          goto("/");
        } else {
          await authRepository.signOut();
          errors.push("This User Does Not have The right Permission To Login");
          throw new Error(
            "This User Does Not have The right Permission To Login"
          );
        }
      } catch (error) {
        console.log("Error", error);
        return errors;
      }
    },

    signOut: async () => {
      try {
        await authRepository.signOut();
        set(null);
        goto("/login");
      } catch (error) {
        console.log("Error", error);
        return errors;
      }
    },

    listUsers: async (options?: GenericListOptions) => {
      try {
        const { documents, total } = await authRepository.listUsers(options);

        const listUsersDto: AuthDto[] = documents.map(
          (user) => Dto.ToAuthDto(user) as AuthDto
        );

        return { data: listUsersDto, total };
      } catch (error) {
        console.log("Error", error);
        return errors;
      }
    },

    getUser: async (userId: string) => {
      try {
        if (!userId) {
          errors.push("User Id is Required");
          throw new Error("User Id is Required");
        }
        const user = await authRepository.getUser(userId);
        const userDto: AuthDto = Dto.ToAuthDto(user);

        return userDto;
      } catch (error) {
        console.log("Error", error);
        return errors;
      }
    },

    update: async (auth: CreateAuthRequest) => {
      try {
        if (auth.name === "") {
          errors.push("Name is Required");
          throw new Error("Name is Required");
        }
        if (auth.prefs?.image.url) {
          if (auth.prefs?.image.url instanceof File) {
            auth.prefs.image.url = (await ImageToUrl(
              auth.prefs.image.url as File
            )) as string;
          }
        }
        await authRepository.update(auth);
      } catch (e) {
        console.log("Error :", e);
        return errors;
      }
    },
  };
};

export const authStore = createAuthStore();
