import api from '@/config/axios';
import { ApiResponse } from '@/interfaces/api-response';
import createQueryFn from '@/utils/createQueryFn';
import { useQuery } from '@tanstack/react-query';
import { CountResponse } from '@/features/book-list/types/types';

const getBorrowedQuantity = async (
  userId: string
): Promise<ApiResponse<CountResponse>> => {
  const { data } = await api.get<ApiResponse<CountResponse>>(
    `/borrow-return/users/${userId}/count`
  );
  return data;
};

const useBorrowedQuantity = (userId: string) => {
  return useQuery<ApiResponse<CountResponse>>({
    queryKey: ['user-detail', userId],
    queryFn: createQueryFn(getBorrowedQuantity),
  });
};

export default useBorrowedQuantity;
