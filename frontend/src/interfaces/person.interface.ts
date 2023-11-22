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

interface OfficialElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  ci: HTMLInputElement;
  address: HTMLInputElement;
  phone: HTMLInputElement;
  areaId: HTMLSelectElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export interface OfficialCustomForm extends HTMLFormElement {
  readonly elements: OfficialElements;
}
