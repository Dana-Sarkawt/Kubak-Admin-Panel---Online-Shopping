import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { CardDto } from "$lib/Models/DTO/Card.DTO.Model";
import type { CreateCardRequest } from "$lib/Models/Requests/CreateCard.Request";
import type { Store } from "$lib/Models/Response/Store.Response";
import { CardRepository } from "$lib/Repositories/Implementation/Card.Repository";
import { writable } from "svelte/store";
import { ImageToUrl } from "../../utils/ImageToUrl.Utils";

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
        console.log("Error :", e);
      }
    },

    getAll: async () => {
      try {
        let { documents, total } = await cardRepository.getCards();

        let dto: CardDto[] = documents.map((document) => {
          return Dto.ToCardDto(document);
        });
        set({ data: dto, total: total });
        return dto;
      } catch (e) {
        console.log("Error:", e);
      }
    },

    create: async (card: CreateCardRequest) => {
      try {
        if (card.name == "") {
          throw new Error("Card Name is required");
        }
        if (card.image.url == "") {
          throw new Error("Card Image is required");
        }
        if (card.image.url instanceof File) {
          card.image.url = (await ImageToUrl(card.image.url as File)) as string;
        }

        await cardRepository.createCard(card);
      } catch (e) {
        console.log("Error :", e);
      }
    },

    update: async (card: CreateCardRequest) => {
      try {
        const document = await cardRepository.getCard(card.id as string);

        if (document === null) {
          throw new Error(`Card not found with the following id:${card.id}`);
        }

        if (card.name != "") {
          document.name = card.name;
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

        return "Deleted";
      } catch (e) {
        console.log("Error :", e);
      }
    },
  };
};


export const cardStore = createCardStore();