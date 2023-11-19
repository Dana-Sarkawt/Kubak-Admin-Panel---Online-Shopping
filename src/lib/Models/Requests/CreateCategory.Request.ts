export interface CreateCategoryRequest {
    name: string;
    description?: string;
    image: {
    url: string | File,
    localUrl?: string | null
    };
    userId: string;
  }