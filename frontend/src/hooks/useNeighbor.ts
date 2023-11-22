import useSWR from "swr";

import { Person } from "../interfaces/person.interface";
import { ErrorMessage } from "../interfaces/errorMessage.type";
import { getNeighbor, neighborsUrl } from "../services/neighbor.service";

const useGetNeighbor = (id: string) => {
  const { data, isLoading, error } = useSWR<Person, ErrorMessage>(
    `${neighborsUrl}/${id}`,
    getNeighbor
  );

  return { neighborFound: data, isLoading, error };
};

export { useGetNeighbor };
