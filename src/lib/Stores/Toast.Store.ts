import { ToastMessages } from "$lib/Models/Enums/Toast-Messages.Enum.Model";
import { writable } from "svelte/store";

const createToastStore = () => {
  const { subscribe, set, update } = writable<ToastMessages>(ToastMessages.DEFAULT);;

  return {
    subscribe,
    set: (value: ToastMessages) => set(value),
    update: (fn: (value: ToastMessages) => ToastMessages) => update(fn),
  };

};

export const toastStore = createToastStore();