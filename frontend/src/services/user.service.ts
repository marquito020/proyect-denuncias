import { baseUrl } from "../constants/routes";
import { ErrorMessage } from "../interfaces/errorMessage.type";

export const usersUrl = baseUrl + "/api/users";

const getUser = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const messageError = (await response.json()) as ErrorMessage;
    throw new Error(messageError.message);
  }

  const data = await response.json();
  return data;
};

export { getUser };
