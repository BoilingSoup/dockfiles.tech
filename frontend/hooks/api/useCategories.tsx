import { useQuery } from "react-query";
import { API_URL } from "../../config/config";
import { apiFetch } from "../../query-client/baseFetcher";
import { GET, queryKeys } from "../../query-client/constants";

type CategoriesData = {
  success: boolean;
  data: Array<{
    id: number;
    name: string;
  }>;
};

const getCategories: () => Promise<CategoriesData> = async () => {
  return (await apiFetch(`${API_URL}/categories/list`, GET)) as CategoriesData;
};

export const useCategories = () => {
  const { data, isLoading, isError, error } = useQuery([queryKeys.categoriesList], getCategories);

  return { data, isLoading, isError, error };
};
