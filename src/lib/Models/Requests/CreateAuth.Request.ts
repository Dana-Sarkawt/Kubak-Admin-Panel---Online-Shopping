import type { Gender } from "$lib/Models/Enums/Gender.Enum.Model";

export interface CreateAuthRequest {
  id?: string | null;
  name?: string;
  prefs?: Prefs;
}

interface Prefs {
  gender: Gender;
  birthday: Date;
  image: {
    url: string | File;
    localUrl?: string | null;
  };
}

export interface AuthRequest {
    
}
