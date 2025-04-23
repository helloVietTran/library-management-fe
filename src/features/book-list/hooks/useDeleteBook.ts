import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import queryKeys from "@/config/queryKey";
import api from "@/config/axios";

const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookId: string) => {
      return await api.delete(`/books/${bookId}`);
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

export default useDeleteBook;
