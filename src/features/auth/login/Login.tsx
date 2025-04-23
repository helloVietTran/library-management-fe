import React from "react";
import { Form, Input, Button, message } from "antd";
import { GoShieldLock } from "react-icons/go";
import { SlEnvolope } from "react-icons/sl";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import api from "@/config/axios";
import useAuthStore from "@/store/authStore";
import AuthLogo from "../components/AuthLogo";
import AuthTitle from "../components/AuthTitle";
import AuthAction from "../components/AuthAction";
import { setAuthCookies } from "@/utils/cookie";
import { LoginResponse } from "../types/types";

function Login() {
  const router = useRouter();
  const [form] = Form.useForm();
  const { login: loginAction } = useAuthStore();

  const mutation = useMutation<LoginResponse, unknown, { email: string; password: string }>({
    mutationFn: async ({ email, password }) => {
      const res = await api.post("/auth/login", { email, password });
   
      return res.data;
    },
    onSuccess: (data) => {
      message.success("Đăng nhập thành công!");

      loginAction(data.user);

      setAuthCookies({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      });
      router.push("/");
    },
    onError: () => {
      message.error("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
    },

  });

  const handleSubmit = (values: { email: string; password: string }) => {
    mutation.mutate(values);
  };
  return (
    <div className="login">
      <AuthLogo />
      <AuthTitle label="Đăng nhập" />

      <Form size="large" form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email không được để trống" },
            { type: "email", message: "Email sai định dạng" },
          ]}
        >
          <Input size="large" prefix={<SlEnvolope />} placeholder="Nhập email" />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Mật khẩu không được để trống" },
            { min: 6, message: "Mật khẩu phải lớn hơn 6 kí tự" },
          ]}
        >
          <Input.Password size="large" prefix={<GoShieldLock />} placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Đăng nhập
        </Button>
      </Form>

      <AuthAction
        primaryLabel="Đăng kí."
        primaryDescription="Không có tài khoản?"
        primaryHref="/auth/register"
      />
    </div>
  );
}

export default Login;
