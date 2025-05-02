import React, { useState } from 'react';
import {
  Table,
  TableColumnsType,
  Avatar,
  Tag,
  Select,
  Button,
  App,
} from 'antd';
import Link from 'next/link';
import dayjs from 'dayjs';

import BoxContent from '@/components/BoxContent';
import Pagination from '@/components/Pagination';
import DataTableHeader from '@/components/DataTableHeader';
import Loader from '@/components/Loader';
import useBorrowRecords from '../hooks/useBorrowRecords';
import ExportDropdown from '@/components/ExportDropdown';
import dowloadExcel from '@/utils/downloadExcel';
import downloadPDF from '@/utils/dowloadPDF';
import BorrowModal from './BorrowModal';
import BorrowReturnActions from './BorrowReturnActions';
import OverdueEmailTemplate from './OverdueEmailTemplate';
import SendEmailModal from '@/components/SendEmailModal';
import ReturnBookModal from './ReturnBookModal';
import { BorrowRecord } from '@/types/types';
import useSendEmail from '../hooks/useSendEmail';

const emailTemplates = [
  {
    key: 'overdue',
    label: 'Mẫu thông báo quá hạn trả sách',
    component: OverdueEmailTemplate,
  },
];

const BorrowTable: React.FC = () => {
  const { message } = App.useApp();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openReturnModal, setOpenReturnModal] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchValue, setSearchValue] = useState<string>('');

  const [filter, setFilter] = useState('all');
  // notification
  const [selectedData, setSelectedData] = useState<BorrowRecord | null>(null);
  const [isOpenEmailModal, setIsOpenEmailModal] = useState<boolean>(false);

  // call api
  const { data: borrowData, isLoading } = useBorrowRecords(
    currentPage,
    pageSize,
    searchValue,
    filter
  );

  // handlers
  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleSearch = (value: string) => setSearchValue(value);
  const handlePageSizeChange = (value: number) => setPageSize(value);

  const handleReceive = (record: BorrowRecord) => {
    setSelectedData(record);
    setOpenReturnModal(true);
  };

  const handleChange = (value: string) => setFilter(value);

  // send mail
  const sendMailMutation = useSendEmail();
  const handleSendEmail = () => {
    if (selectedData)
      sendMailMutation.mutate({
        receiver: selectedData.user.email,
        recordId: selectedData._id,
      });

    setIsOpenEmailModal(false);
  };
  // gửi thông báo
  const handleNotify = (record: BorrowRecord) => {
    const isOverdue = record.dueDate
      ? dayjs().isAfter(dayjs(record.dueDate))
      : false;

    if (!isOverdue) {
      message.info('Người này chưa quá hạn trả sách');
      return;
    }

    setSelectedData(record);
    setIsOpenEmailModal(true);
  };

  const statusMap: Record<string, { color: string; text: string }> = {
    ok: { color: 'green', text: 'Bình thường' },
    lost: { color: 'volcano', text: 'Mất sách' },
    break: { color: 'red', text: 'Hư hỏng' },
  };

  const renderStatusTag = (status: string) => {
    const tag = statusMap[status] || {
      color: 'default',
      text: 'Không xác định',
    };
    return <Tag color={tag.color}>{tag.text}</Tag>;
  };

  // define columns
  const columns: TableColumnsType<BorrowRecord> = [
    {
      title: '',
      key: 'action',
      render: (_: BorrowRecord, record: BorrowRecord) =>
        !record.returnDate ? (
          <BorrowReturnActions
            record={record}
            onReceiveBook={handleReceive}
            onNotifyUser={handleNotify}
          />
        ) : null,
    },
    {
      title: 'Người mượn',
      dataIndex: 'user',
      key: 'user',
      render: (_, record: BorrowRecord) => (
        <Link
          href={`/users/${record.user._id}`}
          className="flex items-center gap-4"
        >
          <Avatar
            size={32}
            src={record.user.avatar || null}
            style={{
              backgroundColor: !record.user.avatar ? '#f56a00' : 'transparent',
              color: !record.user.avatar ? '#fff' : undefined,
            }}
          >
            {!record.user.avatar
              ? record.user.fullName.charAt(0).toUpperCase()
              : null}
          </Avatar>
          <span>{record.user.fullName}</span>
        </Link>
      ),

      sorter: (a, b) => a.user.fullName.localeCompare(b.user.fullName),
    },

    {
      title: 'Đang mượn',
      dataIndex: 'book',
      key: 'book',
      render: (_, record: BorrowRecord) => (
        <Link
          href={`/books/${record.book._id}`}
          className="flex items-center gap-4"
        >
          <Avatar
            shape="square"
            size={32}
            src={record.book.coverImage || null}
            style={{
              backgroundColor: !record.book.coverImage
                ? '#87d068'
                : 'transparent',
              color: !record.book.coverImage ? '#fff' : undefined,
            }}
          >
            {!record.book.coverImage
              ? record.book.title.charAt(0).toUpperCase()
              : null}
          </Avatar>
          <span>{record.book.title}</span>
        </Link>
      ),
    },
    {
      title: 'Ngày mượn',
      dataIndex: 'borrowDate',
      key: 'createdAt',
      render: (createdAt) => dayjs(createdAt).format('DD-M-YYYY'),
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Hạn trả',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (dueDate) => dayjs(dueDate).format('DD-M-YYYY'),
    },
    {
      title: 'Ngày trả',
      dataIndex: 'returnDate',
      key: 'returnDate',
      render: (_: any, record: BorrowRecord) => {
        const { returnDate, dueDate } = record;
        if (returnDate) {
          return dayjs(returnDate).format('DD-MM-YYYY');
        }

        const isOverdue = dayjs().isAfter(dayjs(dueDate));
        return (
          <Tag color={isOverdue ? 'volcano' : 'red'}>
            {isOverdue ? 'Quá hạn' : 'Chưa trả'}
          </Tag>
        );
      },
    },
    {
      title: 'Tình trạng sách',
      dataIndex: 'status',
      key: 'status',
      render: renderStatusTag,
    },

    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      render: (note) => (note?.trim() ? note : 'Không có'),
    },
  ];
  // export file
  const headers = [
    { id: 'user.fullName', header: 'Tên người mượn' },
    { id: 'book.title', header: 'Sách mượn' },
    { id: 'dueDate', header: 'Ngày hết hạn trả' },
    { id: 'returnDate', header: 'Ngày trả' },
    { id: 'status', header: 'Trạng thái sách' },
  ];
  const handleExportExcel = () => {
    if (!borrowData) message.warning('Vui lòng chờ tải dữ liệu');
    dowloadExcel(borrowData.data, headers, 'Data mượn trả sách');
  };

  const handleExportPDF = () => {
    if (!borrowData) message.warning('Vui lòng chờ tải dữ liệu');
    downloadPDF(borrowData.data, headers, 'Data mượn trả sách');
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <div className="flex items-center justify-between my-4">
        <Select defaultValue="all" onChange={handleChange}>
          <Select.Option value="all">Tất cả</Select.Option>
          <Select.Option value="not-returned">Chưa trả</Select.Option>
          <Select.Option value="returned">Đã trả</Select.Option>
        </Select>

        <div className="flex items-center gap-2">
          <ExportDropdown
            downloadExcel={handleExportExcel}
            downloadPDF={handleExportPDF}
          />
          <Button
            onClick={() => setOpenModal(true)}
            type="primary"
            size="middle"
            className="text-sm"
          >
            Cho mượn sách
          </Button>
        </div>
      </div>
      <BoxContent>
        <DataTableHeader
          onPageSizeChange={handlePageSizeChange}
          onSearch={handleSearch}
          searchValue={searchValue}
          searchPlaceholder="Tìm kiếm lịch sử mượn trả"
          pageSize={pageSize}
        />
        <Table
          columns={columns}
          dataSource={borrowData.data}
          rowKey="_id"
          pagination={false}
          scroll={{ x: 'max-content' }}
        />
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalElement={borrowData.totalElement}
            handlePageChange={handlePageChange}
          />
        </div>
      </BoxContent>

      <BorrowModal openModal={openModal} setOpenModal={setOpenModal} />

      <SendEmailModal
        open={isOpenEmailModal}
        onClose={() => setIsOpenEmailModal(false)}
        emailTemplates={emailTemplates}
        templateProps={{
          name: selectedData?.user.fullName,
          bookTitle: selectedData?.book.title,
          dueDate: selectedData?.dueDate,
          borrowDate: selectedData?.createdAt,
        }}
        title="Gửi mail yêu cầu trả sách"
        onOK={handleSendEmail}
      />

      <ReturnBookModal
        openModal={openReturnModal}
        setOpenModal={setOpenReturnModal}
        recordId={selectedData?._id}
      />
    </>
  );
};

export default BorrowTable;
