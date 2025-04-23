import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd"; 

import api from "@/config/axios";
import queryKeys from "@/config/queryKey";
import { UpdateUserStatusData } from "../types/types";

const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();  

  return useMutation({
    mutationFn: async ({ userId, status }: UpdateUserStatusData) => {
      console.log({ userId, status });
      const { data } = await api.put(`/users/status/${userId}`, { status });
      return data;
    },

    onSuccess: () => {
      message.success("Cập nhật trạng thái người dùng thành công!");
      queryClient.invalidateQueries({ queryKey: [queryKeys.USERS] });
    },

    onError: (err: any) => {
      const errorMsg =
        err?.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại sau!";
      message.error(errorMsg);
    },
  });
};

export default useUpdateUserStatus;