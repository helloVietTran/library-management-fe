import { useQuery } from "@tanstack/react-query";

import api from "@/config/axios";
import { Comment } from "@/types/types";
import createQueryFn from "@/utils/createQueryFn";

const getCommentsByBookId = async (bookId: string): Promise<Comment[]> => {
  const { data } = await api.get(`/comments/books/${bookId}`);
  return data;
};

const useComments = (bookId: string) => {
  return useQuery<Comment[]>({
    queryKey: ["comments", bookId],
    queryFn: createQueryFn(getCommentsByBookId),
    staleTime: 5 * 60 * 1000,
  });
};

export default useComments;
