import axios from "axios";

import { baseUrl } from "../constants/routes";
import { TypeComplaint } from "../interfaces/typeComplaint.interface";

export const typeComplaintUrl = baseUrl + "/api/types";

type ErrorMessage = {
  message: string;
};

const getAllTypesOfComplaints = async (url: string) => {
  const { data } = await axios.get<TypeComplaint[]>(url);
  return data;
};

const addTypeOfComplaint = async (
  url: string,
  { arg }: { arg: TypeComplaint }
) => {
  const { data } = await axios.post<TypeComplaint>(url, arg, {
    headers: { "Content-Type": "application/json" },
  });

  return data;
};

const getTypeOfComplaint = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const messageError = (await response.json()) as ErrorMessage;
    throw new Error(messageError.message);
  }

  return await response.json();
};

const updateTypeOfComplaint = async (
  url: string,
  { arg }: { arg: TypeComplaint }
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

  return await response.json();
};

const deleteTypeOfComplaint = async (url: string, { arg }: { arg: string }) => {
  const { data } = await axios.delete<TypeComplaint>(`${url}/${arg}`);
  return data;
};

const getAllTypesComplaintWithComplaints = async (url: string) => {
  const { data } = await axios.get(`${url}-complaints`);
  const result = data as TypeComplaint[];
  return result;
  // const response = await fetch(`${url}-complaints`);
  // const data = (await response.json()) as TypeComplaint[];
  // return data;
};

export {
  getAllTypesOfComplaints,
  addTypeOfComplaint,
  getTypeOfComplaint,
  updateTypeOfComplaint,
  deleteTypeOfComplaint,
  getAllTypesComplaintWithComplaints,
};
