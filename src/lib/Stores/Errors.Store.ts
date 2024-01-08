import type { ErrorMessages } from "$lib/Models/Common/ErrorMessages.Common.Model";
import { writable } from "svelte/store";

const createErrorStore = () => {
  const { subscribe, set, update } = writable<ErrorMessages[]>([]);

  return {
    subscribe,
    set: (value: ErrorMessages[]) => set(value),
    add: (value: ErrorMessages) =>
      update((messages) => {
        // Check if the error message already exists in the store
        const isDuplicate = messages.some(
          (message) => message.message === value.message
        );

        // Only add the message if it's not a duplicate
        if (!isDuplicate) {
          return [...messages, value];
        } else {
          return messages;
        }
      }),
    remove: (value: ErrorMessages) =>
      update((n) => n.filter((e) => e !== value)),
    clear: () => set([]),
  };
};

export const errorStore = createErrorStore();
