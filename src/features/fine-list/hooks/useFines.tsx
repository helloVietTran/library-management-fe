import { useQuery } from "@tanstack/react-query";

import api from "@/config/axios";
import queryKeys from "@/config/queryKey";
import createQueryFn from "@/utils/createQueryFn";


const getFines = async (page: number, pageSize: number, search?: string, paid?: string) => {
  const { data } = await api.get("/fines", {
    params: { page, pageSize, search, paid },
  });
  return data;
};

const useFines = (page: number, pageSize: number, search: string, paid: string) => {
  return useQuery({
    queryKey: [queryKeys.FINES, page, pageSize, search, paid],
    queryFn: createQueryFn(getFines),
    placeholderData: (prevData) => prevData,
    staleTime: 5 * 60 * 1000,
  });
};

export default useFines;
