import type {Datetime} from "$lib/Models/Extensions/Datetime.Extention.Model";

export interface CategoryDto extends Datetime {
    id: string;
    name: string;
    categoryImage: string;
    deletedAt: Date | null;
}
