import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

import { CountResponse } from "../types/types";
import queryKeys from "@/config/queryKey";

const getBorrowedCount = async (): Promise<CountResponse> => {
  const { data } = await api.get<CountResponse>("/borrow-return/count");
  return data;
};

const useBorrowedCount = () => {
  return useQuery<CountResponse>({
    queryKey: [queryKeys.BORROWED_COUNT],
    queryFn: getBorrowedCount,
    staleTime: 60 * 60 * 1000,
  });
};

export default useBorrowedCount;
