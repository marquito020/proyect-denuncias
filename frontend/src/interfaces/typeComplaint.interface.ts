import { Complaint } from "./complaint.interface";

export interface TypeComplaint {
  _id?: string;
  name: string;
  tags: string[];
  complaints?: Complaint[]
}


interface TypeComplaintElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  tags: HTMLSelectElement;
}

export interface TypeComplaintCustomForm extends HTMLFormElement {
  readonly elements: TypeComplaintElements;
}