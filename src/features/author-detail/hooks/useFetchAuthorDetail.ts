import api from '@/config/axios';
import queryKeys from '@/config/queryKey';
import { ApiResponse } from '@/interfaces/api-response';
import { Author } from '@/interfaces/commom';
import { useQuery } from '@tanstack/react-query';

const fetchAuthorById = async (authorId: string): Promise => {
  const { data } = await api.get<ApiResponse>(`/authors/${authorId}`);
  return data;
};

const useFetchAuthorById = (authorId: string) => {
  return useQuery<ApiResponse>({
    queryKey: [queryKeys.authorDetail(authorId), authorId],
    queryFn: () => fetchAuthorById(authorId),
    staleTime: 5 * 60 * 1000,
    enabled: !!authorId,
  });
};

export default useFetchAuthorById;
