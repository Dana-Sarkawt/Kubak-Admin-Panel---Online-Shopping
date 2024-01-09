import { Dto } from "$lib/Models/Conversion/Conversion.Model";
import type { CardDto } from "$lib/Models/DTO/Card.DTO.Model";
import type { CreateCardRequest } from "$lib/Models/Requests/CreateCard.Request.Model";
import type { Store } from "$lib/Models/Response/Store.Response";
import { CardRepository } from "$lib/Repositories/Implementation/Card.Repository";
import { writable } from "svelte/store";
import { goto } from "$app/navigation";
import { toastStore } from "./Toast.Store";
import { ToastMessages } from "$lib/Models/Enums/Toast-Messages.Enum.Model";
import { HttpError } from "$lib/Errors/HttpErrors.Error";
import { errorStore } from "./Errors.Store";
import { Errors } from "$lib/Models/Enums/Errors.Enum.Model";
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
    get: async (id?: string) => {
      errorStore.clear();
      try {
        if (!id) {
          throw new HttpError(Errors.NotFound, "Id is Required");
        }
        let document = await cardRepository.getCard(id);
        return Dto.ToCardDto(document);
      } catch (e) {
        if (e instanceof HttpError) errorStore.add(e.response());
      }
    },

    getAll: async () => {
      errorStore.clear();
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
      errorStore.clear();
      try {
        if (card.webpageUrl == "") {
          throw new HttpError(Errors.BadRequest, "Card Web Url is required");
        }
        if (new Date(card.expirationDate) < new Date()) {
          throw new HttpError(
            Errors.BadRequest,
            "Expiration date Must be Greater Than Todays Date"
          );
        }
        const listCards = (await cardRepository.getCards()).documents;
        if (listCards.length >= 3) {
          throw new HttpError(
            Errors.Forbidden,
            "Cards Limit Has Been Reached Please Delete Some Cards"
          );
        }
        if (card.image.url == "") {
          throw new HttpError(Errors.BadRequest, "Card Image is required");
        }
        if (card.image.url instanceof File) {
          card.image.url = (await ImageToUrl(card.image.url as File)) as string;
        }
        await cardRepository.createCard(card);
        toastStore.set(ToastMessages.CREATE);
        goto("/cards");
      } catch (e) {
        if (e instanceof HttpError) errorStore.add(e.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },

    update: async (card: CreateCardRequest) => {
      errorStore.clear();
      try {
        const document = await cardRepository.getCard(card.id as string);

        if (document === null) {
          throw new HttpError(Errors.NotFound, `Card not found`);
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
        } else {
          card.image.url = document.cardImage;
        }

        await cardRepository.updateCard(card);
        toastStore.set(ToastMessages.SUCCESS);
        goto("/cards");
      } catch (e) {
        if (e instanceof HttpError) errorStore.add(e.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },

    delete: async (id: string) => {
      errorStore.clear();
      try {
        let document = await cardRepository.getCard(id);

        if (document === null)
          throw new HttpError(
            Errors.NotFound,
            `Card not found with the following id:${id}`
          );

        await cardRepository.deleteCard(id);

        await cardStore.getAll();

        toastStore.set(ToastMessages.ERROR);
        return "Deleted";
      } catch (e) {
        if (e instanceof HttpError) errorStore.add(e.response());
        toastStore.set(ToastMessages.WARNING);
      }
    },
  };
};

export const cardStore = createCardStore();
