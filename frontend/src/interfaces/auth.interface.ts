export interface Auth {
  email: string;
  password: string;

}

interface LoginElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export interface LoginCustomForm extends HTMLFormElement {
  readonly elements: LoginElements;
}