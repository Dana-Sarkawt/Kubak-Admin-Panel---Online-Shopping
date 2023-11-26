import type { Database } from "../Extensions/Database.Extension.Model";

export interface Card extends Database{
    userId:string,
    webpageUrl:string | null,
    expirationDate:Date,
    cardImage:string,
    deletedAt: Date | null
}