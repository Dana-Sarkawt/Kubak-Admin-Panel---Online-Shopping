import type {Database} from "$lib/Models/Extensions/Database.Extension.Model";

export interface Category extends Database {
    userId: string;
    name: string;
    description: string | null;
    categoryImage: string;
    deletedAt: Date | string | null;
}
