import type { Gender } from "$lib/Models/Enums/Gender.Enum.Model";

export interface CreateAuthRequest {
  id?: string | null,
  name?: string,
  prefs?: Prefs,
}

interface Prefs {
  gender: Gender,
  birthday: Date | string,
  image: {
    url: string | File,
    localUrl?: string | null,
  },
}

interface RequestPrefs {
    gender: Gender,
    birthday: Date | string,
    image: string
  }

export interface AuthRequest {
    id?: string | null,
    name: string,
    prefs: RequestPrefs,
}
