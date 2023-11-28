import { goto } from "$app/navigation";
import type { GenericListOptions } from "$lib/Models/Common/ListOptions.Common.Model";
import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { AuthDto } from "$lib/Models/DTO/Auth.DTO.Model";
import { Roles } from "$lib/Models/Enums/Roles.Enum.Model";
import { AuthRepository } from "$lib/Repositories/Implementation/Auth.Repository";
import { writable } from "svelte/store";

const authRepository = new AuthRepository();

const createAuthStore = () => {
  const { subscribe, set, update } = writable<AuthDto | null>();
  return {
    subscribe,
    set: (auth: AuthDto) => set(auth),
    get: async () => {
      try {
        const user = await authRepository.getAuth();

        if (!user) {
          throw new Error("No User Was Found");
        }
        const userDto: AuthDto = Dto.ToAuthDto(user);

        set(userDto);
      } catch (error) {
        console.log(error);
        set(null);
        goto("/login");
        return null;
      }
    },

    signIn: async (phone: string) => {
      try {
        const userId = await authRepository.signIn(phone);
        if (!userId) {
          throw new Error(`No User Was Found By This Phone Number : ${phone}`);
        }

        return userId;
      } catch (error) {
        console.log("Error", error);
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
          throw new Error(
            "This User Does Not have The right Permission To Login"
          );
        }
      } catch (error) {
        console.log("Error", error);
      }
    },

    signOut: async () => {
      try {
        await authRepository.signOut();
        set(null);
        goto("/login");
      } catch (error) {
        console.log("Error", error);
      }
    },

    listUsers: async (options: GenericListOptions) => {
      try {
        const { documents, total } = await authRepository.listUsers(options);

        const listUsersDto: AuthDto[] = documents.map(
          (user) => Dto.ToAuthDto(user) as AuthDto
        );

        return { data: listUsersDto, total };
      } catch (error) {
        console.log("Error", error);
      }
    },
  };
};

export const authStore = createAuthStore();
