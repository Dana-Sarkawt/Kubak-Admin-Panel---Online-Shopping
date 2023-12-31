import type { Card } from "$lib/Models/Entities/Card.Entity.Model";
import type { CreateCardRequest } from "$lib/Models/Requests/CreateCard.Request.Model";

export interface ICardsRepository {
    getCards(): Promise<AppwriteResponse<Card>>;

    getCard(id: string): Promise<Card>;

    createCard(card: CreateCardRequest): Promise<void>;

    updateCard(card: CreateCardRequest): Promise<Card>;

    deleteCard(id: string): Promise<void>;
}