export interface UserInfo {
  _id: string;
  email: string;
  name: string;
  photo: string;
  personId: string;
  token: string;
  rolName: string;
}

export interface User {
  _id?: string;
  email: string;
  passwords: string[];
  lastPasswordChange?: Date;
  tokenMovil: string;
  state?: boolean;
}
