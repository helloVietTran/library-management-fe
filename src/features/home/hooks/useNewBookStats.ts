import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

import { TimeBasedStatsResponse } from "../types/types";

const getBookSCountThisAndLastMonth = async (): Promise<TimeBasedStatsResponse> => {
  const { data } = await api.get<TimeBasedStatsResponse>(
    "/books/stats/new-books"
  );
  return data;
};

const useNewBookStats = () => {
  return useQuery<TimeBasedStatsResponse, Error>({
    queryKey: ["new-books-stats"],
    queryFn: getBookSCountThisAndLastMonth,
    staleTime: 60 * 60 * 1000,
  });
};

export default useNewBookStats;
