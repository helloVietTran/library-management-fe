import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";

import { TimeBasedStatsResponse } from "../types/types";

const getUsersCountThisAndLastMonth = async (): Promise<TimeBasedStatsResponse> => {
  const { data } = await api.get<TimeBasedStatsResponse>(
    "/users/stats/new-users"
  );
  return data;
};

const useNewUserStats = () => {
  return useQuery<TimeBasedStatsResponse, Error>({
    queryKey: ["new-users-stats"],
    queryFn: getUsersCountThisAndLastMonth,
    staleTime: 60 * 60 * 1000,
  });
};

export default useNewUserStats;
