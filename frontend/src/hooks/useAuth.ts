import useSWRMutation from "swr/mutation";

import { authUrl, login } from "../services/auth.service";
import { UserInfo } from "../interfaces/user.interface";
import { Auth } from "../interfaces/auth.interface";

const useLogin = () => {
  const { trigger, error, isMutating } = useSWRMutation<
    UserInfo,
    string,
    string,
    Auth
  >(authUrl, login);

  return { loginUser: trigger, error, isMutating };
};

export { useLogin };
