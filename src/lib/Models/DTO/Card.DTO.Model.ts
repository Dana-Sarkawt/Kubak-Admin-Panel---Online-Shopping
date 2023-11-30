import type { Datetime } from "$lib/Models/Extensions/Datetime.Extention.Model";

export interface CardDto extends Datetime{
    id:string,
    userId:string,
    webpageUrl:string,
    expirationDate:Date,
    cardImage:string
}