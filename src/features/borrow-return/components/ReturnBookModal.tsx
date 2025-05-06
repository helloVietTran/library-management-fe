import React from 'react';
import { Modal, message, Form, Input, Select } from 'antd';
import useReturnBook from '../hooks/useReturnBook';

interface ReturnBookModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  recordId?: string;
}

const ReturnBookModal: React.FC = ({ openModal, setOpenModal, recordId }) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setOpenModal(false);
  };

  const returnMutation = useReturnBook(recordId, handleCancel);

  // Gửi yêu cầu trả sách
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        returnMutation.mutate(values);
      })
      .catch(() => {
        message.error('Vui lòng điền đầy đủ thông tin hợp lệ!');
      });
  };

  return (
    <Modal
      title={
        <h1 className="text-primary mb-2 border-b border-gray-300 pb-2 text-xl font-semibold">
          Nhận sách
        </h1>
      }
      open={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <Form
        form={form}
        layout="vertical"
        name="returnForm"
        initialValues={{
          status: 'ok',
          note: '',
        }}
        requiredMark={false}
        className="space-y-4"
      >
        {/* Trạng thái sách */}
        <Form.Item
          name="status"
          label="Trạng thái sách"
          rules={[
            { required: true, message: 'Vui lòng chọn trạng thái sách.' },
          ]}
        >
          <Select size="large">
            <Select.Option value="ok">Sách bình thường</Select.Option>
            <Select.Option value="break">Sách bị hư hỏng</Select.Option>
            <Select.Option value="lost">Sách bị mất</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="note" label="Ghi chú">
          <Input.TextArea placeholder="Nhập ghi chú (nếu có)" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReturnBookModal;
