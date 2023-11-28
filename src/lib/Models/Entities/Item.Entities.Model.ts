import type { Database } from "$lib/Models/Extensions/Database.Extension.Model";
import type { Category } from "$lib/Models/Entities/Category.Entity.Model";

export interface Item extends Database {
  userId: string;
  name: string;
  price: number;
  itemImage: string;
  productionDate: Date;
  expiredDate: Date;
  quantity: number;
  detail: string;
  popularity: number;
  category: Category[];
  deletedAt: Date | null;
}