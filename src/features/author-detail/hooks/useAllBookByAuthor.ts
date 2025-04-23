import api from "@/config/axios";
import createQueryFn from "@/utils/createQueryFn";
import { useQuery } from "@tanstack/react-query";

const getBooksByAuthor = async (authorId: string) => {
  const { data } = await api.get(`/books/authors/${authorId}`);
  return data;
};

const useAllBookByAuthor = (authorId: string) => {
  return useQuery({
    queryKey: ["books-by-author", authorId],
    queryFn: createQueryFn(getBooksByAuthor),
    staleTime: 5 * 60 * 1000,
    enabled: !!authorId
  });
};

export default useAllBookByAuthor;
