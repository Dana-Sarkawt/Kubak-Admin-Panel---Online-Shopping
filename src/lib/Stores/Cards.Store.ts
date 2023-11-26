import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { CardDto } from "$lib/Models/DTO/Card.DTO.Model";
import type { CreateCardRequest } from "$lib/Models/Requests/CreateCard.Request";
import type { Store } from "$lib/Models/Response/Store.Response";
import { CardRepository } from "$lib/Repositories/Implementation/Card.Repository";
import { writable } from "svelte/store";
import { ImageToUrl } from "../../utils/ImageToUrl.Utils";
import { goto } from "$app/navigation";

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
        goto("/cards");
      } catch (e) {
        console.log(e);
      }
    },

    update: async (card: CreateCardRequest) => {
      try {
        const document = await cardRepository.getCard(card.id as string);

        if (document === null) {
          throw new Error(`Card not found with the following id:${card.id}`);
        }

        if (card.webpageUrl != "") {
          document.webpageUrl = card.webpageUrl;
        }
        if (card.image.url != "") {
          if (card.image.url instanceof File) {
            card.image.url = (await ImageToUrl(
              card.image.url as File
            )) as string;
          }
          document.cardImage = card.image.url;
        }

        await cardRepository.updateCard(document);
      } catch (e) {
        console.log("Error :", e);
      }
    },

    delete: async (id: string) => {
      try {
       
        let document = await cardRepository.getCard(id);
        

        if (document === null)
          throw new Error(`Card not found with the following id:${id}`);

        await cardRepository.deleteCard(id);

        await cardStore.getAll();

        return "Deleted";
      } catch (e) {
        console.log("Error :", e);
      }
    },
  };
};

export const cardStore = createCardStore();
