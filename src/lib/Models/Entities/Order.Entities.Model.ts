import type { Database } from "$lib/Models/Extensions/Database.Extension.Model";
import type { Item } from "$lib/Models/Entities/Item.Entities.Model";
import type { Address } from "$lib/Models/Entities/Address.Entity.Model";

export interface Order extends Database {
  status: number;
  totalPrice: number;
  userId: string;
  deletedAt: Date | string | null;
  items: Item[];
  address: Address;
}
