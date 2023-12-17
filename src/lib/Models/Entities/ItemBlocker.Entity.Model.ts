import type { Database } from "$lib/Models/Extensions/Database.Extension.Model";
import type { Item } from "$lib/Models/Entities/Item.Entities.Model";
import type { Order } from "$lib/Models/Entities/Order.Entities.Model";

export interface ItemsBlocker extends Database {
    quantity: number,
    items: Item,
    orders:Order,
    orderId:string,
    itemId:string,
}
