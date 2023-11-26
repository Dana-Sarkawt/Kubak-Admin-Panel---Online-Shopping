import type { Database } from "../Extensions/Database.Extension.Model";

export interface Card extends Database{
    name: any;
    image: any;
    userId:string,
    webpageUrl:string | null,
    expirationDate:Date,
    cardImage:string,
}