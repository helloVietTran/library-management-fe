import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

import { TimeBasedStatsResponse } from "../types/types";

const getMonthlyUserCounts = async (): Promise<TimeBasedStatsResponse> => {
  const { data } = await api.get<TimeBasedStatsResponse>(
    "/borrow-return/stats/new-records"
  );
  return data;
};

const useNewBorrowRecordStats = () => {
  return useQuery<TimeBasedStatsResponse, Error>({
    queryKey: ["new-records-stats"],
    queryFn: getMonthlyUserCounts,
    staleTime: 60 * 60 * 1000,
  });
};

export default useNewBorrowRecordStats;
