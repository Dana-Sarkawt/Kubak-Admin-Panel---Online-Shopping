import { Appwrite } from "$lib/Appwrite/Appwrite";
import { Environment } from "$lib/Env/Environment";
import type { Card } from "$lib/Models/Entities/Card.Entity.Model";
import type { CardRequest, CreateCardRequest } from "$lib/Models/Requests/CreateCard.Request";
import { ID, Query } from "appwrite";
import type { ICardsRepository } from "../Interface/I.Cards.Repository";

export class CardRepository implements ICardsRepository {
  async getCards(): Promise<AppwriteResponse<Card>> {
    let { documents, total } = (await Appwrite.databases.listDocuments(
      Environment.appwrite_database,
      Environment.appwrite_collection_card,
      [
        Query.isNull("deletedAt"),
        Query.limit(3)
      ]
    )) as AppwriteResponse<Card>;

    return { documents, total };
  }
  async getCard(id: string): Promise<Card> {
    return (await Appwrite.databases.getDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_card,
      id
    )) as Card;
  }
  async createCard(card: CreateCardRequest): Promise<void> {
    const cardRequest: CardRequest = {
      userId: card.userId,
      webpageUrl: card.webpageUrl as string,
      cardImage: card.image.url as string,
      expirationDate: card.expirationDate,
    };

    await Appwrite.databases.createDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_card,
      ID.unique(),
      cardRequest
    );
  }
  async updateCard(card: Card): Promise<Card> {
    const result = await Appwrite.databases.updateDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_card,
      card.$id,
      card
    );

    return result as Card;
  }

  async deleteCard(id: string): Promise<void> {
    console.log(id);
    await Appwrite.databases.updateDocument(
      Environment.appwrite_database,
      Environment.appwrite_collection_card,
      id,
      {
        deletedAt: new Date(),
      }
    );
  }
}
