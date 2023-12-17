import {TypeMapper} from "ts-mapper";
import type {Category} from '$lib/Models/Entities/Category.Entity.Model';
import type {CategoryDto} from '$lib/Models/DTO/Category.DTO.Model';

export class Mapper extends TypeMapper {
    constructor() {
        super();
        this.config();
    }

    private config(): void {
        this.createMap<Category, CategoryDto>();
    }
}

export const mapper = new Mapper();
