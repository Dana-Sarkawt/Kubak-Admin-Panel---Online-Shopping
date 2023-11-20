export interface CreateUpdateCategoryRequest {
    id: string;
    name: string;
    description?: string;
    image: {
    url: string | File,
    localUrl?: string | null
    };
    userId: string;
    deletedAt?: Date | null;
  }