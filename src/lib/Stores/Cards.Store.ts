import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { CardDto } from "$lib/Models/DTO/Card.DTO.Model";
import type { CreateCardRequest } from "$lib/Models/Requests/CreateCard.Request.Model";
import type { Store } from "$lib/Models/Response/Store.Response";
import { CardRepository } from "$lib/Repositories/Implementation/Card.Repository";
import { writable } from "svelte/store";
import { ImageToUrl } from "../../utils/ImageToUrl.Utils";
import { goto } from "$app/navigation";
import { toastStore } from "./Toast.Store";
import { ToastMessages } from "$lib/Models/Enums/Toast-Messages.Enum.Model";

const cardRepository = new CardRepository();

const createCardStore = () => {
  const { subscribe, set, update } = writable<Store<CardDto>>({
    data: [],
    total: 0,
  });

  return {
    subscribe,
    set: (value: Store<CardDto>) => set(value),
    get: async (id: string) => {
      try {
        if(!id) return;
        let document = await cardRepository.getCard(id);

        return Dto.ToCardDto(document);
      } catch (e) {
        console.log(e);
      }
    },

    getAll: async () => {
      try {
        let { documents, total } = await cardRepository.getCards();

        let dto: CardDto[] = documents.map((document) => {
          return Dto.ToCardDto(document) as CardDto;
        });
        set({ data: dto, total: total });
        return dto;
      } catch (e) {
        console.log(e);
      }
    },

    create: async (card: CreateCardRequest) => {
      try {
        if (card.webpageUrl == "") {
          throw new Error("Card Web Url is required");
        }
        if (new Date(card.expirationDate) < new Date()) {
          throw new Error("Expiration date Must be Greater Than Todays Date");
        }
        const listCards = (await cardRepository.getCards()).documents;
        if(listCards.length >= 3){
          throw new Error("Cards Limit Has Been Reached Please Delete Some Cards");
        }
        if (card.image.url == "") {
          throw new Error("Card Image is required");
        }
        if (card.image.url instanceof File) {
          card.image.url = (await ImageToUrl(card.image.url as File)) as string;
        }

        await cardRepository.createCard(card);
        toastStore.set(ToastMessages.CREATE);
        goto("/cards");
      } catch (e) {
        console.log(e);
        toastStore.set(ToastMessages.CREATE);
      }
    },

    update: async (card: CreateCardRequest) => {
      try {
        const document = await cardRepository.getCard(card.id as string);

        if (document === null) {
          throw new Error(`Card not found with the following id:${card.id}`);
        }

        if (card.webpageUrl == "") {
          card.webpageUrl = document.webpageUrl as string;
        }
        if (card.image.url != "") {
          if (card.image.url instanceof File) {
            card.image.url = (await ImageToUrl(
              card.image.url as File
            )) as string;
          }
        }else{
          card.image.url = document.cardImage;
        }

        await cardRepository.updateCard(card);
        toastStore.set(ToastMessages.SUCCESS);
        goto("/cards");
      } catch (e) {
        console.log("Error :", e);
        toastStore.set(ToastMessages.WARNING);
      }
    },

    delete: async (id: string) => {
      try {
       
        let document = await cardRepository.getCard(id);
        

        if (document === null)
          throw new Error(`Card not found with the following id:${id}`);

        await cardRepository.deleteCard(id);

        await cardStore.getAll();

        toastStore.set(ToastMessages.ERROR);
        return "Deleted";
      } catch (e) {
        console.log("Error :", e);
        toastStore.set(ToastMessages.WARNING);
      }
    },
  };
};

export const cardStore = createCardStore();
