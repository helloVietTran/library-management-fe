import { useQuery } from '@tanstack/react-query';
import api from '@/config/axios';
import { ApiResponse } from '@/interfaces/api-response';
import { Comment } from '@/interfaces/commom';
import queryKeys from '@/config/queryKey';

const fetchCommentsByUserId = async (userId: string) => {
  const { data } = await api.get<ApiResponse<Comment[]>>(
    `/comments/users/${userId}`
  );
  return data;
};

const useComments = (bookId: string) => {
  return useQuery<ApiResponse<Comment[]>>({
    queryKey: [queryKeys.COMMENTS, bookId],
    queryFn: () => fetchCommentsByUserId(bookId),
    staleTime: 5 * 60 * 1000,
  });
};

export default useComments;
