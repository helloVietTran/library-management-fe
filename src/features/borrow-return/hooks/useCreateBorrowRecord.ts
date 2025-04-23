import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

import api from "@/config/axios";
import queryKeys from "@/config/queryKey";
import { CreateBorrowRecordData } from "../types/types";

export const useCreateBorrowRecord = (onSuccessCallback: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (borrowData: CreateBorrowRecordData) => {
      return await api.post("/borrow-return", borrowData);
    },
    onSuccess: () => {
      message.success({ content: "Tạo yêu cầu thành công!", key: "borrow" });
      queryClient.invalidateQueries({ queryKey: [queryKeys.BORROW_RECORDS] });

      onSuccessCallback();
    },
    onError: () => {
      message.error({
        content: "Có lỗi xảy ra! Vui lòng thử lại.",
        key: "borrow",
      });
    },
  });
};
