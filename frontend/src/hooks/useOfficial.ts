import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { ErrorMessage } from "../interfaces/errorMessage.type";
import { Person } from "../interfaces/person.interface";
import {
  addOfficial,
  deleteOfficial,
  getAllOfficials,
  getOfficial,
  officialUrl,
  updateOfficial,
} from "../services/official.service";

const useAllOfficials = () => {
  const { data, isLoading, error } = useSWR<Person[], ErrorMessage>(
    officialUrl,
    getAllOfficials
  );

  return { officials: data, isLoading, error };
};

const useAddOfficial = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    officialUrl,
    addOfficial
  );

  return { addOfficial: trigger, isMutating, error };
};

const useGetOfficial = (id: string) => {
  const { data, isLoading, error } = useSWR<Person, ErrorMessage>(
    `${officialUrl}/${id}`,
    getOfficial
  );

  return { officialFound: data, isLoading, error };
};

const useUpdateOfficial = (id: string) => {
  const { trigger, isMutating, error } = useSWRMutation(
    `${officialUrl}/${id}`,
    updateOfficial
  );

  return { updateOfficial: trigger, isMutating, error };
};

const useDeleteOfficial = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    officialUrl,
    deleteOfficial
  );

  return { deleteOfficial: trigger, isMutating, error };
};

export {
  useAllOfficials,
  useAddOfficial,
  useGetOfficial,
  useUpdateOfficial,
  useDeleteOfficial,
};
