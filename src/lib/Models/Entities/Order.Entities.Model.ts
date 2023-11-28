import type { Database } from "$lib/Models/Extensions/Database.Extension.Model";
import type { Item } from "$lib/Models/Entities/Item.Entities.Model";

export interface Order extends Database {
  status: number;
  totalAmount: number;
  userId: string;
  deletedAt: Date | string | null;
  items: Item[];
}
