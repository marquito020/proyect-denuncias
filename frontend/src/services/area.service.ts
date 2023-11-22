import { baseUrl } from "../constants/routes";
import { Area } from "../interfaces/area.interface";
import { ErrorMessage } from "../interfaces/errorMessage.type";

export const areaUrl = baseUrl + "/api/areas";

const getAllAreas = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const messageError = (await response.json()) as ErrorMessage;
    throw new Error(messageError.message);
  }

  const data = (await response.json()) as Area[];
  return data;
};

const addArea = async (url: string, { arg }: { arg: Area }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const messageError = (await response.json()) as ErrorMessage;
    throw new Error(messageError.message);
  }

  const data = (await response.json()) as Area;
  return data;
};

const getArea = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const messageError = (await response.json()) as ErrorMessage;
    throw new Error(messageError.message);
  }

  const data = (await response.json()) as Area;
  return data;
};

const updateArea = async (url: string, { arg }: { arg: Area }) => {
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const messageError = (await response.json()) as ErrorMessage;
    throw new Error(messageError.message);
  }

  const data = (await response.json()) as Area;
  return data;
};

const deleteArea = async (url: string, { arg }: { arg: string }) => {
  const response = await fetch(`${url}/${arg}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const messageError = (await response.json()) as ErrorMessage;
    throw new Error(messageError.message);
  }

  const data = await response.json();
  return data;
};

export { getAllAreas, addArea, getArea, updateArea, deleteArea };
