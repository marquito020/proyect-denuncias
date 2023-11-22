import { baseUrl } from "../constants/routes";
import { ErrorMessage } from "../interfaces/errorMessage.type";
import { Person } from "../interfaces/person.interface";
import { User } from "../interfaces/user.interface";

export const officialUrl = baseUrl + "/api/officials";

const getAllOfficials = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const messageError = (await response.json()) as ErrorMessage;
    throw new Error(messageError.message);
  }

  const data = (await response.json()) as Person[];
  return data;
};

const addOfficial = async (
  url: string,
  { arg }: { arg: { user: Partial<User>; person: Person } }
) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const messageError = (await response.json()) as ErrorMessage;
    throw new Error(messageError.message);
  }

  const data = (await response.json()) as Person;
  return data;
};

const getOfficial = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const messageError = (await response.json()) as ErrorMessage;
    throw new Error(messageError.message);
  }

  const data = (await response.json()) as Person;
  return data;
};

const updateOfficial = async (
  url: string,
  { arg }: { arg: { user: Partial<User>; person: Person } }
) => {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const messageError = (await response.json()) as ErrorMessage;
    throw new Error(messageError.message);
  }

  const data = await response.json();
  return data;
};

const deleteOfficial = async (url: string, { arg }: { arg: string }) => {
  const response = await fetch(`${url}/${arg}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const messageError = (await response.json()) as ErrorMessage;
    throw new Error(messageError.message);
  }

  const data = (await response.json()) as Person;
  return data;
};

export {
  getAllOfficials,
  addOfficial,
  getOfficial,
  updateOfficial,
  deleteOfficial,
};
