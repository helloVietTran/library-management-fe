import { useQuery, UseQueryResult } from '@tanstack/react-query';
import api from '@/config/axios';
import queryKeys from '@/config/queryKey';
import { PaginatedResponse } from '@/interfaces/api-response';
import { BorrowRecord } from '@/interfaces/commom';

const fetchBorrows = async (
  page: number,
  pageSize: number,
  search?: string,
  filter?: string
): Promise => {
  const { data } = await api.get<PaginatedResponse>('/borrow-return', {
    params: { page, pageSize, search, filter },
  });
  return data;
};

const useFetchBorrowRecords = (
  page: number,
  pageSize: number,
  search: string,
  filter: string
): UseQueryResult => {
  return useQuery<PaginatedResponse>({
    queryKey: [queryKeys.BORROW_RECORDS, page, pageSize, search, filter],
    queryFn: () => fetchBorrows(page, pageSize, search, filter),
    staleTime: 5 * 60 * 1000,
  });
};

export default useFetchBorrowRecords;
