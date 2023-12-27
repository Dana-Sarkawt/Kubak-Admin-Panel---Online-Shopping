import type { Datetime } from "$lib/Models/Extensions/Datetime.Extention.Model";
import type { DriverDto } from "$lib/Models/DTO/Driver.DTO.Model";
import type { OrderDto } from "$lib/Models/DTO/Order.DTO.Model";

export interface OrderStatusDto extends Datetime {
    id: string;
    destination: string;
    orderId: string;
    order: OrderDto | null;
    driverId: string;
    driver: DriverDto | null;
    status: string;
}