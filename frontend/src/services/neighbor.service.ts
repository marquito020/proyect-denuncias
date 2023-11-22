import { baseUrl } from "../constants/routes";
import { ErrorMessage } from "../interfaces/errorMessage.type";
import { Person } from "../interfaces/person.interface";

export const neighborsUrl = baseUrl + "/api/neighbors";

const getNeighbor = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const messageError = (await response.json()) as ErrorMessage;

    throw new Error(messageError.message);
  }

  const data = (await response.json()) as Person;
  return data;
};

export { getNeighbor };
