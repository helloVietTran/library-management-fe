import { useQuery } from "@tanstack/react-query";

import api from "@/config/axios";
import queryKeys from "@/config/queryKey";
import createQueryFn from "@/utils/createQueryFn";

const getBooks = async (page: number, pageSize: number, search?: string) => {
  const { data } = await api.get("/books", {
    params: { page, pageSize, search },
  });
  return data;
};

const useBooks = (page: number, pageSize: number, search?: string) => {
  return useQuery({
    queryKey: [queryKeys.BOOKS, page, pageSize, search],
    queryFn: createQueryFn(getBooks),
    placeholderData: (prevData) => prevData,
    staleTime: 5 * 60 * 1000, 
  });
};

export default useBooks;
