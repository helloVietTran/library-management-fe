import { useQuery } from "@tanstack/react-query";

import api from "@/config/axios";
import { BorrowedCountStatsResponse } from "../types/types";
import queryKeys from "@/config/queryKey";

const getBorrowedCountStats = async (): Promise<BorrowedCountStatsResponse[]> => {
  const { data } = await api.get<BorrowedCountStatsResponse[]>(
    '/books/stats?by=borrowedTurn'
  );
  return data;
};

const useBorrowedCountStats = () => {
  return useQuery<BorrowedCountStatsResponse[]>({
    queryKey: [queryKeys.BORROWED_TURN_STATS],
    queryFn: getBorrowedCountStats,
    staleTime: 60 * 60 * 1000,
  });
};

export default useBorrowedCountStats;
