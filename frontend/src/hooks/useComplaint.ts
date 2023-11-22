import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import {
  addObservationWithState,
  complaitsUrl,
  getAllComplaintsOfficial,
  getComplaint,
} from "../services/complaint.service";
import { Complaint } from "../interfaces/complaint.interface";
import { ErrorMessage } from "../interfaces/errorMessage.type";

const useAllComplaintsOfficial = (id: string) => {
  const { data, isLoading, error, mutate } = useSWR<Complaint[], ErrorMessage>(
    `${complaitsUrl}/official/${id}`,
    getAllComplaintsOfficial
  );

  return { complaints: data, isLoading, error, mutate };
};

const useGetComplaint = (id: string) => {
  const { data, isLoading, error } = useSWR<Complaint, ErrorMessage>(
    `${complaitsUrl}/${id}`,
    getComplaint
  );

  return { complaintFound: data, isLoading, error };
};

const useAddObservationWithState = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    `${complaitsUrl}/observation`,
    addObservationWithState
  );

  return { addObservationWithState: trigger, isMutating, error };
};

export {
  useAllComplaintsOfficial,
  useGetComplaint,
  useAddObservationWithState,
};
