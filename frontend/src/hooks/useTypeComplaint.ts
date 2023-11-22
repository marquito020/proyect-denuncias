import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import {
  typeComplaintUrl,
  getAllTypesOfComplaints,
  getAllTypesComplaintWithComplaints,
  deleteTypeOfComplaint,
  addTypeOfComplaint,
  getTypeOfComplaint,
  updateTypeOfComplaint,
} from "../services/typeComplaint.service";
import { TypeComplaint } from "../interfaces/typeComplaint.interface";

type ErrorMessage = {
  message: string;
};

const useAllTypesOfComplainst = () => {
  const { data, isLoading, error } = useSWR(
    typeComplaintUrl,
    getAllTypesOfComplaints
  );

  return { typesOfComplaints: data, isLoading, error };
};

const useAddTypeOfComplaint = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    typeComplaintUrl,
    addTypeOfComplaint
  );

  return { addTypeOfComplaint: trigger, isMutating, error };
};

const useGetTypeOfComplaint = (id: string) => {
  const { data, error, isLoading } = useSWR<TypeComplaint, ErrorMessage>(
    `${typeComplaintUrl}/${id}`,
    getTypeOfComplaint,
    { dedupingInterval: 0 }
  );

  return { typeComplaint: data, isLoading, error };
};

const useUpdateTypeOfComplaint = (id: string) => {
  const { trigger, isMutating, error } = useSWRMutation(
    `${typeComplaintUrl}/${id}`,
    updateTypeOfComplaint
  );

  return { updatedTypeOfComplaint: trigger, isMutating, error };
};

const useDeleteTypeOfComplaint = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    typeComplaintUrl,
    deleteTypeOfComplaint
  );

  return { deleteTypeOfComplaint: trigger, isMutating, error };
};

const useAllTypesComplaintWithComplaints = () => {
  const { data, isLoading, error } = useSWR(
    typeComplaintUrl,
    getAllTypesComplaintWithComplaints
  );

  return { typesComplaintWithComplaints: data, isLoading, error };
};

export {
  useAllTypesOfComplainst,
  useAddTypeOfComplaint,
  useGetTypeOfComplaint,
  useUpdateTypeOfComplaint,
  useDeleteTypeOfComplaint,
  useAllTypesComplaintWithComplaints,
};
