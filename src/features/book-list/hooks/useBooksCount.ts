import { useQuery } from "@tanstack/react-query";

import api from "@/config/axios";
import { CountResponse } from "../types/types";
import queryKeys from "@/config/queryKey";

const getBooksCount = async (): Promise<CountResponse> => {
  const { data } = await api.get<CountResponse>("/books/count");
  return data;
};

const useBooksCount = () => {
  return useQuery<CountResponse>({
    queryKey: [queryKeys.BOOKS_COUNT],
    queryFn: getBooksCount,
    staleTime: 60 * 60 * 1000,
  });
};

export default useBooksCount;
