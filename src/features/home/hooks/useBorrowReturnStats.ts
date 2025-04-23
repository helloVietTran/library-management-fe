import api from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import { BorrowReturnStatsResponse } from "../types/types";

const getBorrowReturnStats = async (): Promise<BorrowReturnStatsResponse> => {
  const { data } = await api.get<BorrowReturnStatsResponse>(
    "/borrow-return/stats"
  );
  return data;
};

const useBorrowReturnStats = () => {
  return useQuery<BorrowReturnStatsResponse, Error>({
    queryKey: ["borrow-return-stats"],
    queryFn: getBorrowReturnStats,
    staleTime: 60 * 60 * 1000,
  });
};

export default useBorrowReturnStats;
