import { useQuery } from '@tanstack/react-query';
import api from '@/config/axios';
import { ApiResponse } from '@/interfaces/api-response';
import { Conversation } from '@/interfaces/commom';
import queryKeys from '@/config/queryKey';

const fetchConversations = async () => {
  const { data } = await api.get<ApiResponse>('/messages/conversations');
  return data;
};

const useFetchConversations = () => {
  return useQuery<ApiResponse>({
    queryKey: [queryKeys.CONVERSATIONS],
    queryFn: () => fetchConversations(),
    staleTime: 5 * 60 * 1000,
  });
};

export default useFetchConversations;
