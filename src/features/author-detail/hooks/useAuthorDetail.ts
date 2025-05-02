import api from '@/config/axios';
import { ApiResponse } from '@/interfaces/api-response';
import { Author } from '@/interfaces/commom';
import createQueryFn from '@/utils/createQueryFn';
import { useQuery } from '@tanstack/react-query';

const getAuthorById = async (authorId: string) :Promise<ApiResponse<Author>>=> {
  const { data } = await api.get<ApiResponse<Author>>(`/authors/${authorId}`);
  return data;
};

const useAuthorDetail = (authorId: string) => {
  return useQuery<ApiResponse<Author>>({
    queryKey: ['author-detail', authorId],
    queryFn: createQueryFn(getAuthorById),
    staleTime: 5 * 60 * 1000,
  });
};

export default useAuthorDetail;
