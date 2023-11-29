import type { Category } from "$lib/Models/Entities/Category.Entity.Model";

export interface CreateItemRequest {
  id: string | null;
  name: string;
  categoryId: string[];
  price: number;
  detail?: string | null;
  quantity: number;
  productionDate: Date;
  expiredDate: Date;
  image: {
    url: string | File;
    localUrl?: string | null;
  };
  userId: string;
  deletedAt?: Date | null;
}


export interface ItemRequest {
  userId: string;
  name: string;
  price: number;
  itemImage: string;
  productionDate: Date;
  expiredDate: Date;
  quantity: number;
  detail: string;
  category: string[];
}
