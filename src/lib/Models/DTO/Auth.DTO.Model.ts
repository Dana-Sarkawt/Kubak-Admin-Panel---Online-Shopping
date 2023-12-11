import type { Gender } from "$lib/Models/Enums/Gender.Enum.Model";

export interface AuthDto {
    id: string,
    name: string,
    phone: string,
    imgUrl?: string,
    gender?: Gender,
    birthday?: Date | string,
    roles: string[],
}
