import api from '@/config/axios';
import createQueryFn from '@/utils/createQueryFn';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/config/queryKey';
import { ApiResponse } from '@/interfaces/api-response';
import { Book } from '@/interfaces/commom';

const getBookById = async (bookId: string): Promise<ApiResponse<Book>> => {
  const { data } = await api.get<ApiResponse<Book>>(`/books/${bookId}`);
  return data;
};

const useBookDetail = (bookId: string) => {
  return useQuery<ApiResponse<Book>>({
    queryKey: [queryKeys.bookDetail(bookId), bookId],
    queryFn: createQueryFn(getBookById),
    staleTime: 5 * 60 * 1000,
  });
};

export default useBookDetail;
