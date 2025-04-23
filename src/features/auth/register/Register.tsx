import React from "react";
import { Form, Input, Button, message } from "antd";
import { GoShieldLock } from "react-icons/go";
import { SlEnvolope } from "react-icons/sl";
import { FaPenClip } from "react-icons/fa6";

import AuthLogo from "../components/AuthLogo";
import AuthTitle from "../components/AuthTitle";
import AuthAction from "../components/AuthAction";

function Register() {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log("Form values:", values);
        message.success("Đăng ký thành công!");
    };

    return (
        <div className="register">
            <AuthLogo />
            <AuthTitle label="Sign Up" />

            <Form form={form} layout="vertical" onFinish={onFinish}>
                {/* Email */}
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Chưa nhập email" },
                        { type: "email", message: "Email không hợp lệ" },
                    ]}
                >
                    <Input size="large" prefix={<SlEnvolope />} placeholder="Enter your email" />
                </Form.Item>

                {/* First Name */}
                <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                        { required: true, message: "First name is required" },
                        { min: 3, message: "Must be at least 3 characters long" },
                    ]}
                >
                    <Input size="large" prefix={<FaPenClip />} placeholder="Enter your first name" />
                </Form.Item>

                {/* Last Name */}
                <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                        { required: true, message: "Last name is required" },
                        { min: 3, message: "Must be at least 3 characters long" },
                    ]}
                >
                    <Input size="large" prefix={<FaPenClip />} placeholder="Enter your last name" />
                </Form.Item>

                {/* Password */}
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: "Password is required" },
                        { min: 6, message: "Must be at least 6 characters long" },
                    ]}
                >
                    <Input.Password size="large" prefix={<GoShieldLock />} placeholder="Enter your password" />
                </Form.Item>

                {/* Confirm Password */}
                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={["password"]}
                    rules={[
                        { required: true, message: "Confirm password is required" },
                        { min: 6, message: "Must be at least 6 characters long" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Confirm password not match"));
                            },
                        }),
                    ]}
                >
                    <Input.Password size="large" prefix={<GoShieldLock />} placeholder="Confirm your password" />
                </Form.Item>

                <Button type="primary" htmlType="submit" block>
                    Sign up
                </Button>
            </Form>

            <AuthAction
                primaryLabel="Log in."
                primaryDescription="Đã có tài khoản?"
                primaryHref="/auth/login"
            />
        </div>
    );
}

export default Register;
