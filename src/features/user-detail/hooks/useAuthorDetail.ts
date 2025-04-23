import api from "@/config/axios";
import createQueryFn from "@/utils/createQueryFn";
import { useQuery } from "@tanstack/react-query";

const getUserById = async (userId: string) => {
  const { data } = await api.get(`/users/${userId}`);
  return data;
};

const useUserDetail = (userId: string) => {
  return useQuery({
    queryKey: ["user-detail", userId],
    queryFn: createQueryFn(getUserById),
    staleTime: 5 * 60 * 1000,
  });
};

export default useUserDetail;
