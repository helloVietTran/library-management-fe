import api from '@/config/axios';
import { ApiResponse } from '@/interfaces/api-response';
import { Book } from '@/interfaces/commom';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/config/queryKey';

const fetchBooksByAuthor = async (authorId: string): Promise => {
  const { data } = await api.get<ApiResponse>(`/books/authors/${authorId}`);
  return data;
};

const useFetchBooksByAuthor = (authorId: string) => {
  return useQuery<ApiResponse>({
    queryKey: [queryKeys.allBooksByAuthor(authorId), authorId],
    queryFn: () => fetchBooksByAuthor(authorId),
    staleTime: 5 * 60 * 1000,
    enabled: !!authorId,
  });
};

export default useFetchBooksByAuthor;
