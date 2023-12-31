import type { Database } from "../Extensions/Database.Extension.Model";
import type { Driver } from "./Driver.Entity.Model";
import type { Order } from "./Order.Entities.Model";

export interface OrderStatus extends Database {
    destination: string;
    orderId: string;
    order:Order | null;
    driverId: string;
    driver: Driver | null;
    status: string;
    deletedAt: Date | null;
}