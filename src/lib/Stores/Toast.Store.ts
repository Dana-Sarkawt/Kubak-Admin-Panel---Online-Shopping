import { ToastMessages } from "$lib/Models/Enums/Toast-Messages.Enum.Model";
import { get, writable } from "svelte/store";

const toastsStore = writable<ToastMessages>(ToastMessages.DEFAULT);

const createToastStore = () => {
  const { subscribe, set, update } = toastsStore;

  return {
    subscribe,
    set: (value: ToastMessages) => set(value),
    update: (fn: (value: ToastMessages) => ToastMessages) => update(fn),
  };

};

export const toastStore = createToastStore();