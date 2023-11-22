export enum TypeOfPerson {
  official = "official",
  neighbor = "neighbor",
}

export interface Person {
  _id?: string;
  ci: string;
  name: string;
  photo: string;
  address: string;
  phone: string;
  type: TypeOfPerson;
  userId: string;
  areaId: string | null;
}

export type PersonEditDataType = {
  address: string;
  phone: string;
  password?: string;
};
