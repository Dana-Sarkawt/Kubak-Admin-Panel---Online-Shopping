import type { CategoryDto } from "$lib/Models/DTO/Category.DTO.Model";
import type { Category } from "$lib/Models/Entities/Category.Entity.Model";

export interface CreateItemRequest {
  id: string | null;
  name: string;
  category: string[];
  price: number;
  detail?: string | null;
  quantity:number;
  productionDate: Date;
  expireDate: Date;
  image: {
    url: string | File;
    localUrl?: string | null;
  };
  userId: string;
  deletedAt?: Date | null;
}
