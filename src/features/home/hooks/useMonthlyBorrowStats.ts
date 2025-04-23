import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { MonthlyBorrowCountResponse } from "../types/types";

const getMonthlyBorrowCounts =
  async (): Promise<MonthlyBorrowCountResponse> => {
    const { data } = await api.get<MonthlyBorrowCountResponse>(
      "/borrow-return/stats/monthly"
    );
    return data;
  };

const useMonthlyBorrowStats = () => {
  return useQuery<MonthlyBorrowCountResponse, Error>({
    queryKey: ["monthly-borrow-records-stats"],
    queryFn: getMonthlyBorrowCounts,
    staleTime: 60 * 60 * 1000,
  });
};

export default useMonthlyBorrowStats;
