import React, { useEffect, useState } from "react";
import { Modal, Input, message, Form, Select, Row, Col, InputNumber } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import debounce from "lodash/debounce";

import api from "@/config/axios";
import { Author } from "@/types/types";
import convertToFormData from "@/utils/convertFormData";

interface BookModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  bookId?: string;
}

const BookModal: React.FC<BookModalProps> = ({ openModal, setOpenModal, bookId }) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [authorOptions, setAuthorOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  // hàm gợi ý tên tác giả
  const fetchAuthorSuggestions = debounce(async (searchText: string) => {
    try {
      const res = await api.get('/authors', {
        params: { search: searchText }
      });
      const options = res.data.data.map((author: any) => ({
        label: author.name,
        value: author.name,
      }));
      setAuthorOptions(options);
    } catch (err) {
      console.error("Lỗi khi tìm tác giả:", err);
    }
  }, 300);

  // nếu có bookId => form sửa, còn không là form thêm
  const mutation = useMutation({
    mutationFn: async (bookData: FormData) => {
      if (bookId) {
        return await api.put(`/books/${bookId}`, bookData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      return await api.post("/books", bookData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    },
    onSuccess: () => {
      message.success({ content: bookId ? "Cập nhật thành công!" : "Thêm mới thành công!", key: "book" });
      queryClient.invalidateQueries({ queryKey: ["books"] });
      handleCancel();
    },
    onError: (err) => {
      console.log(err)
      message.error({ content: "Có lỗi xảy ra! Vui lòng thử lại.", key: "book-error" });
    },

  });

  useEffect(() => {
    if (bookId) {
      api.get(`/books/${bookId}`).then((res) => {
        const authorNames = res.data.authors.map((author: Author) => author.name);
        form.setFieldsValue({
          ...res.data,
          authors: authorNames,
        });

        setSelectedAuthors(authorNames || []);
      });
    } else {
      form.resetFields();
    }
  }, [bookId, form, openModal]);

  const handleCancel = () => {
    form.resetFields();
    setOpenModal(false);
  };

  const handleOk = () => {
    form.validateFields()
      .then((formValues) => {
        const formData = convertToFormData(formValues);

        mutation.mutate(formData);
      })
      .catch(() => {
        message.error("Vui lòng điền đầy đủ thông tin hợp lệ!");
      });
  };

  return (
    <Modal
      title={<h1 className="text-primary text-xl font-semibold pb-4 border-b border-gray-300">
        {bookId ? "Sửa thông tin sách" : "Nhập thông tin sách"}
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
        name="book-form"
        initialValues={{
          title: "",
          description: "",
          publishedDate: "",
          pageCount: 1,
          authors: [],
          genres: [],
          publisher: "",
          quantity: 1,
          price: 1,
          file: null,
        }}
        requiredMark={false}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true, message: "Tiêu đề là bắt buộc." }]}
            >
              <Input size="large" placeholder="Nhập tiêu đề" />
            </Form.Item>

            <Form.Item
              name="authors"
              label="Tác giả"
              rules={[{ required: true, message: "Danh sách tác giả là bắt buộc." }]}
            >
              <Select
                mode="tags"
                size="large"
                placeholder="Nhập tên tác giả"
                options={authorOptions}
                onSearch={fetchAuthorSuggestions}
                value={selectedAuthors}
                onSelect={(value) => {
                  const updated = [...selectedAuthors, value];
                  setSelectedAuthors(updated);
                  form.setFieldValue("authors", updated);
                }}
                onDeselect={(value) => {
                  const updated = selectedAuthors.filter((item) => item !== value);
                  setSelectedAuthors(updated);
                  form.setFieldValue("authors", updated);
                }}
                allowClear
              />
            </Form.Item>

            <Form.Item
              name="price"
              label="Giá bán"
              rules={[
                { required: true, message: "Vui lòng nhập giá bán." },
                { type: "number", min: 1, message: "Giá bán phải lớn hơn 0." }
              ]}
            >
              <InputNumber
                size="large"
                min={1}
                style={{ width: "100%" }}
                placeholder="Nhập giá bán"
              />
            </Form.Item>

            <Form.Item
              name="pageCount"
              label="Số trang"
              rules={[
                { required: true, message: "Vui lòng nhập số trang." },
                { type: "number", min: 1, message: "Số trang phải lớn hơn 0." }
              ]}
            >
              <InputNumber size="large" min={1} style={{ width: "100%" }} placeholder="Nhập số trang" />
            </Form.Item>

            <Form.Item
              name="file"
              label="Ảnh bìa"
              valuePropName="file"
              getValueFromEvent={(e) => e?.target?.files?.[0]}
            >
              <Input size="large" type="file" accept="image/*" />
            </Form.Item>
            {form.getFieldValue("coverImage") && (
              <img src={form.getFieldValue("coverImage")} alt="Ảnh bìa hiện tại" className="rounded w-32 h-40 object-cover" />
            )}
          </Col>

          <Col span={12}>
            <Form.Item
              name="genres"
              label="Thể loại"
              rules={[
                {
                  validator: (_, value) =>
                    Array.isArray(value)
                      ? Promise.resolve()
                      : Promise.reject(new Error("Thể loại phải là một mảng chuỗi.")),
                },
              ]}
            >
              <Select
                open={false}
                mode="tags"
                size="large"
                placeholder="Nhập danh sách thể loại"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item name="publisher" label="Nhà xuất bản">
              <Input size="large" placeholder="Nhập nhà xuất bản" />
            </Form.Item>

            <Form.Item name="publishedDate" label="Ngày xuất bản">
              <Input size="large" type="date" />
            </Form.Item>

            <Form.Item
              name="quantity"
              label="Số lượng"
              rules={[
                { required: true, message: "Vui lòng nhập số lượng." },
                { type: "number", min: 1, message: "Số lượng phải lớn hơn 0." }
              ]}
            >
              <InputNumber size="large" min={1} style={{ width: "100%" }} placeholder="Nhập số lượng" />
            </Form.Item>

            <Form.Item name="description" label="Mô tả">
              <Input.TextArea size="large" placeholder="Nhập mô tả" />
            </Form.Item>
          </Col>
        </Row>

      </Form>

    </Modal>
  );
};

export default BookModal;