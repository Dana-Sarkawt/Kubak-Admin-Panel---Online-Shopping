import type { Datetime } from "../Extensions/Datetime.Extention.Model";

export interface CardDto extends Datetime{
    id:string,
    userId:string,
    webpageUrl:string,
    expirationDate:Date,
    cardImage:string
}