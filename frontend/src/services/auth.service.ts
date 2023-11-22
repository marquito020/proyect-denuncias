import { baseUrl } from "../constants/routes";
import { Auth } from "../interfaces/auth.interface";

export const authUrl = baseUrl + "/api/login";

const login = async (url: string, {arg}: { arg:  Auth}) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  return data;
}

export { login }