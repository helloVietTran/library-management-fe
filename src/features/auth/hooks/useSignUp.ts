import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';

import api from '@/config/axios';
import { RegisterResponse, RegisterRequest } from '../types/types';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { saveAuthToSession } from '@/utils/auth';

const useSignUp = () => {
    const { message } = App.useApp();
    const { login: loginAction } = useAuthStore();
    const router = useRouter();

    return useMutation<RegisterResponse, unknown, RegisterRequest>({
        mutationFn: async (data) => {
            const res = await api.post('/auth/register', data);

            return res.data;
        },
        onSuccess: (data) => {
            message.success({
                content: "Đăng ký thành công!",
                key: 'sign-up',
            });
            saveAuthToSession({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken,
            });
            router.push('/');
            loginAction(data.user);
        },
        onError: (err: any) => {
            message.error({
                content: 'Đăng ký thất bại!',
                key: 'sign-up',
            });

            console.log(err.response.data);
        },
    });

};

export default useSignUp;
