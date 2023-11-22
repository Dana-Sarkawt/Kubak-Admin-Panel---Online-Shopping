import type { Auth } from "$lib/Models/DTO/Auth.DTO.Model";
import { AuthRepository } from "$lib/Repositories/Implementation/Auth.Repository";
import { writable } from "svelte/store";

const authRepository = new AuthRepository();

const createAuthStore = () => {
  const { subscribe, set, update } = writable<Auth>();
  return {
    subscribe,
    set: (auth: Auth) => set(auth),
    get: async () => {
      try {
        const user = await authRepository.getAuth();

        const userDto: Auth = {
          id: user.$id,
          name: user.name,
          phone: user.phone,
          imgUrl: user.prefs!.image as string,
          roles: user.labels,
        };

        set(userDto);
      } catch (error) {
        console.log("Error", error);
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
        if (!user.labels.includes("admin")) {
          throw new Error(
            "This User Does Not have The right Permission To Login"
          );
        }

        const userDto: Auth = {
          id: user.$id,
          name: user.name,
          phone: user.phone,
          imgUrl: user.prefs!.image as string,
          roles: user.labels,
        };

        set(userDto);
      } catch (error) {
         console.log("Error", error);
      }
    },

    signOut: async () => {
      try {
      } catch (error) {
        console.log("Error", error);
      }
    },
  };
};

export const authStore = createAuthStore();
