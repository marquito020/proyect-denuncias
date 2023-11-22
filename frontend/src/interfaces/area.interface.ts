export interface Area {
  _id?: string;
  name: string;
  description: string;
  typesComplaintId: string[];
}

interface AreaElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  description: HTMLTextAreaElement;
}

export interface AreaCustomForm extends HTMLFormElement {
  readonly elements: AreaElements;
}