import api from "@/config/axios";
import createQueryFn from "@/utils/createQueryFn";
import { useQuery } from "@tanstack/react-query";

const getAuthors = async (page: number, pageSize: number, search?: string) => {
  const { data } = await api.get("/authors", {
    params: { page, pageSize, search },
  });
  return data;
};
const useAuthors = (page: number, pageSize: number, search?: string) => {
  return useQuery({
    queryKey: ["authors", page, pageSize, search],
    queryFn: createQueryFn(getAuthors),
    placeholderData: (prevData) => prevData,
    staleTime: 5 * 60 * 1000, 
  });
};

export default useAuthors;
