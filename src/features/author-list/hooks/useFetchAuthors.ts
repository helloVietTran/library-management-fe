import api from '@/config/axios';
import { PaginatedResponse } from '@/interfaces/api-response';
import { Author } from '@/interfaces/commom';
import { useQuery } from '@tanstack/react-query';
import queryKeys from '@/config/queryKey';

const fetchAuthors = async (
  page: number,
  pageSize: number,
  search?: string
): Promise => {
  const { data } = await api.get<PaginatedResponse>('/authors', {
    params: { page, pageSize, search },
  });
  return data;
};

const useFetchAuthors = (page: number, pageSize: number, search?: string) => {
  return useQuery<PaginatedResponse>({
    queryKey: [queryKeys.AUTHORS, page, pageSize, search],
    queryFn: () => fetchAuthors(page, pageSize, search),
    staleTime: 5 * 60 * 1000,
  });
};

export default useFetchAuthors;
