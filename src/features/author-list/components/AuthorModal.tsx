import React, { useEffect, useState } from "react";
import { Modal, Input, message, Form, Row, Col, Select } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { countries, ICountry } from 'countries-list'

import api from "@/config/axios";
import convertToFormData from "@/utils/convertFormData";
import useAuthorMutation from "../hooks/useAuthorMutation";

interface AuthorModalProps {
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
    authorId?: string;
}

const AuthorModal: React.FC<AuthorModalProps> = ({ openModal, setOpenModal, authorId }) => {
    const [form] = Form.useForm();
    const [countryOptions, setCountryOptions] = useState<{ label: string; value: string }[]>([]);

    useEffect(() => {
        const countryList = Object.values(countries).map((country: ICountry) => ({
            label: country.name,
            value: country.name,
        }));

        setCountryOptions(countryList);

        if (authorId)
            api.get(`/authors/${authorId}`).then((res) => {
                form.setFieldsValue({
                    ...res.data,
                    imgSrc: res.data.imgSrc,
                });
            });
        else
            form.resetFields();

    }, [authorId, form, openModal]);

    // hủy 
    const handleCancel = () => {
        form.resetFields();
        setOpenModal(false);
    };

    const authorMutation = useAuthorMutation(authorId, handleCancel);
    // ok
    const handleOk = () => {
        form.validateFields()
            .then((formValues) => {
                const formData = convertToFormData(formValues);

                authorMutation.mutate(formData);
            })
            .catch(() => {
                message.error("Vui lòng điền đầy đủ thông tin hợp lệ!");
            });
    };


    return (
        <Modal
            title={<h1 className="text-primary text-xl font-semibold pb-4 border-b border-gray-300">
                {authorId ? "Sửa thông tin tác giả" : "Nhập thông tin tác giả"}
            </h1>}
            open={openModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Lưu"
            cancelText="Hủy"
        >
            <Form
                form={form}
                layout="vertical"
                name="authorForm"
                initialValues={{
                    name: "",
                    biography: "",
                    dob: null,
                    nationality: "",
                    awards: [],
                    file: null,
                }}
                requiredMark={false}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label={
                                <span>
                                    Tên tác giả <span style={{ color: "red" }}>*</span>
                                </span>
                            }
                            rules={[{ required: true, message: "Tên tác giả là bắt buộc." }]}
                        >
                            <Input size="large" placeholder="Nhập tên tác giả" />
                        </Form.Item>

                        <Form.Item
                            name="dob"
                            label="Ngày sinh"
                            rules={[{ type: "date", message: "Ngày sinh phải là một ngày hợp lệ." }]}
                        >
                            <Input size="large" type="date" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="nationality"
                            label="Quốc tịch"
                        >
                            <Select
                                style={{ width: "100%" }}
                                placeholder="Nhập hoặc chọn quốc tịch"
                                options={countryOptions}
                                showSearch
                                optionFilterProp="label"
                                size="large"
                            />
                        </Form.Item>

                        <Form.Item name="awards" label="Giải thưởng">
                            <Select
                                open={false}
                                mode="tags"
                                size="large"
                                placeholder="Giải thưởng"
                                style={{ width: "100%" }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Mô tả và ảnh bìa */}
                <Form.Item
                    name="biography"
                    label="Tiểu sử"
                    rules={[{ type: "string", message: "Giới thiệu phải là một chuỗi." }]}
                >
                    <Input.TextArea size="large" rows={4} placeholder="Nhập tiểu sử" />
                </Form.Item>

                <Form.Item
                    name="file"
                    label="Ảnh bìa"
                    valuePropName="file"
                    getValueFromEvent={(e) => e?.target?.files?.[0]}
                >
                    <Input size="large" type="file" accept="image/*" />
                </Form.Item>

                {form.getFieldValue("imgSrc") && (
                    <img
                        src={form.getFieldValue("imgSrc")}
                        alt="Ảnh bìa tác giả"
                        className="rounded w-32 h-40 object-cover mb-4"
                    />
                )}
            </Form>
        </Modal>
    );
};

export default AuthorModal;
