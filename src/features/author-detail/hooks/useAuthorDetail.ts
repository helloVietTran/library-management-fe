import api from "@/config/axios";
import createQueryFn from "@/utils/createQueryFn";
import { useQuery } from "@tanstack/react-query";

const getAuthorById = async (authorId: string) => {
  const { data } = await api.get(`/authors/${authorId}`);
  return data;
};

const useAuthorDetail = (authorId: string) => {
  return useQuery({
    queryKey: ["author-detail", authorId],
    queryFn: createQueryFn(getAuthorById),
    staleTime: 5 * 60 * 1000,
  });
};

export default useAuthorDetail;
