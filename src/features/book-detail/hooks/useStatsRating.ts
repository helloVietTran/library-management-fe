import { useQuery } from "@tanstack/react-query";

import api from "@/config/axios";
import createQueryFn from "@/utils/createQueryFn";

const getCountCommentsByRating = async (bookId: string): Promise<any> => {
  const { data } = await api.get(`/comments/stats/${bookId}`);
  return data;
};

const useStatsRating = (bookId: string) => {
  return useQuery<any>({
    queryKey: ["rating-stats", bookId],
    queryFn: createQueryFn(getCountCommentsByRating),
    staleTime: 5 * 60 * 1000,
  });
};

export default useStatsRating;
