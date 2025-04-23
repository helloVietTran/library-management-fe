import { Key } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

import queryKeys from "@/config/queryKey";
import api from "@/config/axios";

const useDeleteManyBooks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookIds: string[] | Key[]) => {
      return await api.delete("/books", { data: { bookIds } });
    },
    onSuccess: () => {
      message.success("Xóa sách thành công!");

      queryClient.invalidateQueries({
        queryKey: [
          queryKeys.BOOKS,
          queryKeys.BOOKS_COUNT,
          queryKeys.BORROWED_TURN_STATS,
        ],
      });
    },
    onError: () => {
      message.error("Không thể xóa sách! Vui lòng thử lại.");
    },
  });
};

export default useDeleteManyBooks;
