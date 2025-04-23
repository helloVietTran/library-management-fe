import api from "@/config/axios";
import createQueryFn from "@/utils/createQueryFn";
import { useQuery } from "@tanstack/react-query";

const getUsers = async (page: number, pageSize: number, search?: string) => {
  const { data } = await api.get("/users", {
    params: { page, pageSize, search },
  });
  return data;
};

const useUsers = (page: number, pageSize: number, search: string) => {
  return useQuery({
    queryKey: ["users", page, pageSize, search],
    queryFn: createQueryFn(getUsers),
    placeholderData: (prevData) => prevData,
    staleTime: 5 * 60 * 1000, // Giữ dữ liệu trong 5 phút trước khi làm mới
  });
};

export default useUsers;
