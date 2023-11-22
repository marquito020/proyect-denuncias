import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import {
  addArea,
  areaUrl,
  deleteArea,
  getAllAreas,
  getArea,
  updateArea,
} from "../services/area.service";

import { Area } from "../interfaces/area.interface";
import { ErrorMessage } from "../interfaces/errorMessage.type";

const useAllAreas = () => {
  const { data, isLoading, error } = useSWR<Area[], ErrorMessage>(
    areaUrl,
    getAllAreas
  );

  return { areas: data, isLoading, error };
};

const useAddArea = () => {
  const { trigger, isMutating, error } = useSWRMutation(areaUrl, addArea);

  return { addArea: trigger, isMutating, error };
};

const useGetArea = (id: string) => {
  const { data, error, isLoading } = useSWR<Area, ErrorMessage>(
    `${areaUrl}/${id}`,
    getArea
  );

  return { areaFound: data, isLoading, error };
};

const useUpdateArea = (id: string) => {
  const { trigger, isMutating, error } = useSWRMutation(
    `${areaUrl}/${id}`,
    updateArea
  );

  return { updatedArea: trigger, isMutating, error };
};

const useDeleteArea = () => {
  const { trigger, isMutating, error } = useSWRMutation(areaUrl, deleteArea);

  return { deleteArea: trigger, isMutating, error };
};

export { useAllAreas, useAddArea, useGetArea, useUpdateArea, useDeleteArea };
