import useSWR from "swr";
import { getUser, usersUrl } from "../services/user.service";
import { User } from "../interfaces/user.interface";
import { ErrorMessage } from "../interfaces/errorMessage.type";

const useGetUser = (id: string) => {
  const { data, isLoading, error } = useSWR<User, ErrorMessage>(
    `${usersUrl}/${id}`,
    getUser
  );

  return { userFound: data, isLoading, error };
};

export { useGetUser };
