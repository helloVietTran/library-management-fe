import React, { useEffect, useState, useCallback } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

import api from "@/config/axios";

interface UserModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  userId?: string;
}

const UserModal: React.FC<UserModalProps> = ({ openModal, setOpenModal, userId }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  let loadingMessage: any = null;

  const fetchUserData = useCallback(async () => {
    if (userId) {
      try {
        const res = await api.get(`/users/${userId}`);
        const userData = res.data.user;
        form.setFieldsValue({
          ...userData,
          street: userData.address?.street,
          city: userData.address?.city,
          zipCode: userData.address?.zipCode,
          role: userData.role.name,
        });
        setImageUrl(userData.avatar || null);
      } catch (error) {
        message.error("Lỗi khi tải thông tin người dùng.");
      }
    }
  }, [userId, form]);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    } else {
      form.resetFields();
      setImageUrl(null);
    }
  }, [userId, fetchUserData, form]);

  const mutation = useMutation({
    mutationFn: async (userData: any) => {
      return await api.put(`/users/${userId}`, userData);
    },
    onMutate: () => {
      loadingMessage = message.loading({ content: "Đang cập nhật...", key: "user" });
    },
    onSuccess: () => {
      message.success({ content: "Cập nhật thành công!", key: "user" });
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      handleCancel();
    },
    onError: () => {
      message.error({ content: "Có lỗi xảy ra! Vui lòng thử lại.", key: "user" });
    },
    onSettled: () => {
      if (loadingMessage) {
        message.destroy(loadingMessage);
      }
    },
  });

  const handleSubmit = async (values: any) => {
    const formattedData = {
      ...values,
      address: {
        street: values.street,
        city: values.city,
        zipCode: values.zipCode,
      },
      avatar: imageUrl, // Gửi URL ảnh đã chọn
    };

    mutation.mutate(formattedData);
  };

  const handleCancel = () => {
    form.resetFields();
    setOpenModal(false);
    setImageUrl(null);
  };

  return (
    <Modal
      width={600}
      title={<h3 className="text-primary font-semibold text-xl pb-2 border-b">Chỉnh sửa thông tin người dùng</h3>}
      open={openModal}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Lưu"
      cancelText="Hủy"
      centered
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="grid grid-cols-2 gap-x-6"
        requiredMark={false}
      >
        <Form.Item
          label="Họ và Tên"
          name="fullName"
          rules={[
            { required: true, message: "Họ và tên là bắt buộc" },
            { min: 3, message: "Họ và tên phải có ít nhất 3 ký tự" },
            { max: 100, message: "Họ và tên không được vượt quá 100 ký tự" },
          ]}
        >
          <Input placeholder="Nhập họ và tên" size="large" />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input disabled size="large" />
        </Form.Item>

        <Form.Item label="Số điện thoại" name="phoneNumber" rules={[{ pattern: /^[0-9]{10,15}$/, message: "Số điện thoại phải từ 10 đến 15 chữ số" }]}>
          <Input placeholder="Nhập số điện thoại" size="large" />
        </Form.Item>

        <Form.Item label="Địa chỉ đường" name="street">
          <Input placeholder="Nhập địa chỉ đường" size="large" />
        </Form.Item>

        <Form.Item label="Thành phố" name="city">
          <Input placeholder="Nhập thành phố" size="large" />
        </Form.Item>

        <Form.Item label="Mã bưu điện" name="zipCode">
          <Input placeholder="Nhập mã bưu điện" size="large" />
        </Form.Item>

        <Form.Item label="Vai trò" name="role">
          <Select size="large" disabled>
            <Select.Option value="user">Người dùng</Select.Option>
            <Select.Option value="admin">Quản trị viên</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Avatar" name="avatar">
          <div className="flex items-center gap-4">
            {imageUrl ? (
              <Image src={imageUrl} alt="Avatar" width={80} height={80} className="rounded-full border" />
            ) : (
              <div className="w-20 h-20 flex items-center justify-center border rounded-full bg-gray-100">
                <span className="text-gray-500">No Image</span>
              </div>
            )}

            <Upload
              showUploadList={false}
              beforeUpload={(file) => {
                setImageUrl(URL.createObjectURL(file));
                return false; // Prevent default upload behavior
              }}
              accept="image/*"
              maxCount={1}
            >
              <Button type="default" icon={<MdOutlineCloudUpload />}>
                {imageUrl ? "Thay đổi" : "Tải lên"}
              </Button>
            </Upload>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
