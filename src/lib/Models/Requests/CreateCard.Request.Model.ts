export interface CreateCardRequest {
  id:string | null,
  userId: string,
  webpageUrl: string,
  expirationDate: Date | string,
  image: {
    url: string | File,
    localUrl?: string | null,
  },
}

export interface CardRequest {
  userId: string,
  webpageUrl: string,
  expirationDate: Date,
  cardImage: string,
}
