export interface CreateCardRequest {
  id: string;
  name: string;
  userId: string;
  webpageUrl: string;
  expirationDate: Date;
  image: {
    url: string | File;
    localUrl?: string | null;
  };
}

export interface CardRequest {
  userId: string;
  webpageUrl: string;
  expirationDate: Date;
  cardImage: string;
}
