import api from '@/config/axios';
import { ApiResponse } from '@/interfaces/api-response';
import { Book } from '@/interfaces/commom';
import createQueryFn from '@/utils/createQueryFn';
import { useQuery } from '@tanstack/react-query';

const getBooksByAuthor = async (authorId: string): Promise<ApiResponse<Book[]>> => {
  const { data } = await api.get<ApiResponse<Book[]>>(`/books/authors/${authorId}`);
  return data;
};

const useAllBookByAuthor = (authorId: string) => {
  return useQuery<ApiResponse<Book[]>>({
    queryKey: ['books-by-author', authorId],
    queryFn: createQueryFn(getBooksByAuthor),
    staleTime: 5 * 60 * 1000,
    enabled: !!authorId,
  });
};

export default useAllBookByAuthor;
