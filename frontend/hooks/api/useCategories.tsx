import { useQuery } from "react-query";
import { apiFetch } from "../../query-client/baseFetcher";
import { queryKeys } from "../../query-client/constants";

type CategoriesData = {
  success: boolean;
  data: Array<{
    id: number;
    name: string;
  }>;
};

const getCategories: () => Promise<CategoriesData> = async () => {
  return (await apiFetch.get(`categories`)) as CategoriesData;
};

export const useCategories = () => {
  const { data, isLoading, isError, error } = useQuery([queryKeys.categories], getCategories);

  return { data, isLoading, isError, error };
};
