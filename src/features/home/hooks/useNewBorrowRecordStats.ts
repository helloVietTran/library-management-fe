import api from '@/config/axios';
import { useQuery } from '@tanstack/react-query';

import { TimeBasedStatsResponse } from '../types/types';
import { ApiResponse } from '@/interfaces/api-response';
import queryKey from '@/config/queryKey';

const getMonthlyUserCounts = async (): Promise => {
  const { data } = await api.get<ApiResponse>(
    '/borrow-return/stats/new-records'
  );
  return data;
};

const useNewBorrowRecordStats = () => {
  return useQuery<ApiResponse, Error>({
    queryKey: [queryKey.NEW_BORRWOW_RECORD_STATS],
    queryFn: getMonthlyUserCounts,
    staleTime: 60 * 60 * 1000,
  });
};

export default useNewBorrowRecordStats;
