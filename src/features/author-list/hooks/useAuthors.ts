import api from '@/config/axios';
import { PaginatedResponse } from '@/interfaces/api-response';
import { Author } from '@/interfaces/commom';
import createQueryFn from '@/utils/createQueryFn';
import { useQuery } from '@tanstack/react-query';

const getAuthors = async (
  page: number,
  pageSize: number,
  search?: string
): Promise<PaginatedResponse<Author>> => {
  const { data } = await api.get<PaginatedResponse<Author>>('/authors', {
    params: { page, pageSize, search },
  });
  return data;
};
const useAuthors = (page: number, pageSize: number, search?: string) => {
  return useQuery<PaginatedResponse<Author>>({
    queryKey: ['authors', page, pageSize, search],
    queryFn: createQueryFn(getAuthors),
    placeholderData: (prevData) => prevData,
    staleTime: 5 * 60 * 1000,
  });
};

export default useAuthors;
