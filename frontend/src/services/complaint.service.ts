import { baseUrl } from "../constants/routes";
import { Complaint } from "../interfaces/complaint.interface";
import { ErrorMessage } from "../interfaces/errorMessage.type";

export const complaitsUrl = baseUrl + "/api/complaints";

const getAllComplaintsOfficial = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const messageError = (await response.json()) as ErrorMessage;
    throw new Error(messageError.message);
  }

  const data = (await response.json()) as Complaint[];
  return data;
};

const getComplaint = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const messageError = (await response.json()) as ErrorMessage;
    throw new Error(messageError.message);
  }

  const data = (await response.json()) as Complaint;
  return data;
};

const addObservationWithState = async (
  url: string,
  { arg }: { arg: Partial<Complaint> }
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

  const data = (await response.json()) as Complaint;
  return data;
};

export { getAllComplaintsOfficial, getComplaint, addObservationWithState };
