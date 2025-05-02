import api from '@/config/axios';
import queryKeys from '@/config/queryKey';
import { ApiResponse } from '@/interfaces/api-response';
import { User } from '@/interfaces/commom';
import createQueryFn from '@/utils/createQueryFn';
import { useQuery } from '@tanstack/react-query';

const getUserById = async (userId: string) : Promise<ApiResponse<User>>=> {
  const { data } = await api.get<ApiResponse<User>>(`/users/${userId}`);
  return data;
};

const useUserDetail = (userId: string) => {
  return useQuery<ApiResponse<User>>({
    queryKey: [queryKeys.userDetail(userId), userId],
    queryFn: createQueryFn(getUserById),
    staleTime: 5 * 60 * 1000,
  });
};

export default useUserDetail;
