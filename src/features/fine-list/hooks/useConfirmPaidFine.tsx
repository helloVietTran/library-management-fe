import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

import api from '@/config/axios';
import queryKeys from '@/config/queryKey';

interface FineData {
    paymentMethod: 'cash' | 'card' | 'bank_transfer';
    collectorId: string;
}

const useConfirmPaidFine = (fineId: string, successCallback: () => void) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: FineData) => {
            console.log(data);
            return await api.put(`/fines/${fineId}/pay`, data);
        },
        onSuccess: () => {
            message.success('Đã xác nhận thanh toán thành công!');
            queryClient.invalidateQueries({queryKey: [queryKeys.FINES]})

            successCallback();
        },
        onError: (error: any) => {
            message.error('Thanh toán thất bại, có lỗi xảy ra.');
            console.error(error);
        },
    });
};

export default useConfirmPaidFine;
