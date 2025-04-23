import api from "@/config/axios";
import { Book } from "@/types/types";
import createQueryFn from "@/utils/createQueryFn";
import { useQuery } from "@tanstack/react-query";

const getBookById = async (bookId: string): Promise<Book> => {
  const { data } = await api.get(`/books/${bookId}`);
  return data;
};

const useBookDetail = (bookId: string) => {
  return useQuery<Book>({
    queryKey: ["book-detail", bookId],
    queryFn: createQueryFn(getBookById),
    staleTime: 5 * 60 * 1000,
  });
};

export default useBookDetail;
