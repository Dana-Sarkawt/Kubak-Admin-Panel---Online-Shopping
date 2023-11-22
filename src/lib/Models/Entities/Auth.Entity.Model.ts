export interface Auth {
  $createdAt: string;
  $id: string;
  $updatedAt: string;
  accessedAt: string;
  email: string;
  emailVerification: boolean;
  labels: string[];
  name: string;
  passwordUpdate: string;
  phone: string;
  phoneVerification: boolean;
  prefs: {
    gender:number,
    image:string | null,
    birthday:Date | null
  } | null;
  registration: string;
  status: boolean;
}
