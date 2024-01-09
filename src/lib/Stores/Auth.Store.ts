import { goto } from "$app/navigation";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { AuthDto } from "$lib/Models/DTO/Auth.DTO.Model";
import { Roles } from "$lib/Models/Enums/Roles.Enum.Model";
import type { CreateAuthRequest } from "$lib/Models/Requests/CreateAuth.Request.Model";
import { AuthRepository } from "$lib/Repositories/Implementation/Auth.Repository";
import { writable } from "svelte/store";
import { ImageToUrl } from "../../utils/ImageToUrl.Utils";
import { HttpError } from "$lib/Errors/HttpErrors.Error";
import { Errors } from "$lib/Models/Enums/Errors.Enum.Model";
import { errorStore } from "./Errors.Store";
import { toastStore } from "./Toast.Store";
import { ToastMessages } from "$lib/Models/Enums/Toast-Messages.Enum.Model";

const authRepository = new AuthRepository();

const createAuthStore = () => {
  const { subscribe, set, update } = writable<AuthDto | null>();
  return {
    subscribe,
    set: (auth: AuthDto) => set(auth),
    get: async () => {
      errorStore.clear();
      try {
        const user = await authRepository.getAuth();

        if (!user) {
          throw new HttpError(Errors.NotFound, "No User Was Found");
        }
        const userDto: AuthDto = Dto.ToAuthDto(user);

        set(userDto);
      } catch (error) {
        if (error instanceof HttpError) errorStore.add(error.response());
        set(null);
        goto("/login");
        toastStore.set(ToastMessages.WARNING);
      }
    },

    signIn: async (phone: string) => {
      errorStore.clear();
      try {
        const userId = await authRepository.signIn(phone);
        if (!userId) {
          throw new HttpError(
            Errors.NotFound,
            `No User Was Found By This Phone Number : ${phone}`
          );
        }

        return userId;
      } catch (error) {
        if (error instanceof HttpError) errorStore.add(error.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },

    signInWithEmailAndPassword: async (email: string, password: string) => {
      errorStore.clear();
      try {
        await authRepository.signInWithEmailAndPassword(email, password);
        authStore.get();
        goto("/");
      } catch (error) {
        console.log("Error", error);
      }
    },

    secret: async (userId: string, secret: string) => {
      errorStore.clear();
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
          throw new HttpError(
            Errors.Forbidden,
            "This User Does Not have The right Permission To Login"
          );
        }
      } catch (error) {
        if (error instanceof HttpError) errorStore.add(error.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },

    signOut: async () => {
      errorStore.clear();
      try {
        await authRepository.signOut();
        set(null);
        goto("/login");
      } catch (error) {
        console.log("Error", error);
        toastStore.set(ToastMessages.WARNING);
      }
    },

    listUsers: async (options?: GenericListOptions) => {
      errorStore.clear();
      try {
        const { documents, total } = await authRepository.listUsers(options);

        const listUsersDto: AuthDto[] = documents.map(
          (user) => Dto.ToAuthDto(user) as AuthDto
        );

        return { data: listUsersDto, total };
      } catch (error) {
        toastStore.set(ToastMessages.WARNING);
      }
    },

    getUser: async (userId: string) => {
      errorStore.clear();
      try {
        if (!userId) {
          throw new HttpError(Errors.BadRequest, "User Id is Required");
        }
        const user = await authRepository.getUser(userId);
        const userDto: AuthDto = Dto.ToAuthDto(user);

        return userDto;
      } catch (error) {
        if (error instanceof HttpError) errorStore.add(error.response());
      }
    },

    update: async (auth: CreateAuthRequest) => {
      errorStore.clear();
      try {
        if (auth.name === "") {
          throw new HttpError(Errors.BadRequest, "Name is Required");
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
        if (e instanceof HttpError) errorStore.add(e.response());
      }
    },
  };
};

export const authStore = createAuthStore();
