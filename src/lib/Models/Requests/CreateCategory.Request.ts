export interface CreateCategoryRequest {
    id: string | null;
    name: string;
    description?: string;
    image: {
        url: string | File,
        localUrl?: string | null
    };
    userId: string;
    deletedAt?: Date | null;
}

export interface CategoryRequest {
    userId: string;
    name: string;
    categoryImage: string;
    description?: string;
}