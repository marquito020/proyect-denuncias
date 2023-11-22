export interface User {
  _id?: string;
  email: string;
  passwords: string[];
  lastPasswordChange?: Date;
  tokenMovil: string;
  state?: boolean;
  rolId: string;
}

export type dataUserType = {
  ci: string;
  name: string;
  email: string;
  password: string;
  address: string;
  photo: string;
  phone: string;
  tokenMovil: string;
};
