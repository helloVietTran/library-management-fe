import { useQuery } from "@tanstack/react-query";

import api from "@/config/axios";
import queryKeys from "@/config/queryKey";
import createQueryFn from "@/utils/createQueryFn";

const getBorrows = async (page: number, pageSize: number, search?: string, filter?: string) => {
  const { data } = await api.get("/borrow-return", {
    params: { page, pageSize, search, filter },
  });
  return data;
};

const useBorrowRecords = (page: number, pageSize: number, search: string, filter: string) => {
  return useQuery({
    queryKey: [queryKeys.BORROW_RECORDS, page, pageSize, search, filter],
    queryFn: createQueryFn(getBorrows),
    placeholderData: (prevData) => prevData,
    staleTime: 5 * 60 * 1000,
  });
};

export default useBorrowRecords;
