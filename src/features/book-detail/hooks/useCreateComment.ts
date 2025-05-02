import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import queryKeys from '@/config/queryKey';
import api from '@/config/axios';
import { CreateCommentRequest } from '../types/types';
import { handleErrResponseMsg } from '@/utils/handleErrResponseMsg';

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCommentRequest) => {
      const response = await api.post('/comments', data);
      return response.data;
    },
    onSuccess: () => {
      message.success('Bình luận thành công!');
      queryClient.invalidateQueries({ queryKey: [queryKeys.COMMENTS, queryKeys.RATING_STATS] });
    },
    onError: (err: any) => {
      console.error(err);
      const msg = handleErrResponseMsg(err, 'Có lỗi xảy ra khi xóa bình luận.');
      message.error({
        content: msg,
        key: 'comment-delete-error',
      });
    },
  });
};
