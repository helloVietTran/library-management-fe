import api from '@/config/axios';
import { useQuery } from '@tanstack/react-query';

import { TimeBasedStatsResponse } from '../types/types';
import { ApiResponse } from '@/interfaces/api-response';

const getBookSCountThisAndLastMonth = async (): Promise => {
  const { data } = await api.get<ApiResponse>('/books/stats/new-books');
  return data;
};

const useNewBookStats = () => {
  return useQuery<ApiResponse, Error>({
    queryKey: ['new-books-stats'],
    queryFn: getBookSCountThisAndLastMonth,
    staleTime: 60 * 60 * 1000,
  });
};

export default useNewBookStats;
