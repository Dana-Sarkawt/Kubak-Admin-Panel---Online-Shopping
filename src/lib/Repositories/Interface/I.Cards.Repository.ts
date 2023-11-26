import type { Card } from "$lib/Models/Entities/Card.Entity.Model";
import type { CreateCardRequest } from "$lib/Models/Requests/CreateCard.Request";

export interface ICardsRepository {
    getCards(): Promise<AppwriteResponse<Card>>;

    getCard(id: string): Promise<Card>;

    createCard(card: CreateCardRequest): Promise<void>;

    updateCard(card: Card): Promise<Card>;

    deleteCard(id: string): Promise<void>;
}