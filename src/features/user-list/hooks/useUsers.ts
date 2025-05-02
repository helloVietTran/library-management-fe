import api from '@/config/axios';
import { PaginatedResponse } from '@/interfaces/api-response';
import { User } from '@/interfaces/commom';
import createQueryFn from '@/utils/createQueryFn';
import { useQuery } from '@tanstack/react-query';

const getUsers = async (page: number, pageSize: number, search?: string) : Promise<PaginatedResponse<User>> => {
  const { data } = await api.get<PaginatedResponse<User>>('/users', {
    params: { page, pageSize, search },
  });
  return data;
};

const useUsers = (page: number, pageSize: number, search: string) => {
  return useQuery<PaginatedResponse<User>>({
    queryKey: ['users', page, pageSize, search],
    queryFn: createQueryFn(getUsers),
    placeholderData: (prevData) => prevData,
    staleTime: 5 * 60 * 1000, // Giữ dữ liệu trong 5 phút trước khi làm mới
  });
};

export default useUsers;
