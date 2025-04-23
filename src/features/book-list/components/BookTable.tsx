import React, { Key, useState } from "react";
import { Table, TableColumnsType, Tag, Modal, Avatar } from "antd";
import Link from "next/link";

import BoxContent from '@/components/BoxContent';
import Pagination from "@/components/Pagination";
import DataTableHeader from "@/components/DataTableHeader";
import ActionButtons from "@/components/ActionButtons";
import Loader from "@/components/Loader";
import BookModal from "./BookModal";
import { Book } from "@/types/types";
import useDeleteBook from "../hooks/useDeleteBook";

interface BookTableProps {
    data: Book[];
    totalElement: number;
    isLoading: boolean;
    currentPage: number;
    pageSize: number;
    searchValue: string;
    setCurrentPage: (page: number) => void;
    setPageSize: (size: number) => void;
    setSearchValue: (value: string) => void;
    selectedRowKeys: Key[];
    setSelectedRowKeys: React.Dispatch<React.SetStateAction<Key[]>>;
};

const BookTable: React.FC<BookTableProps> = ({
    data,
    totalElement,
    isLoading,
    currentPage,
    pageSize,
    searchValue,
    setCurrentPage,
    setPageSize,
    setSearchValue,
    selectedRowKeys,
    setSelectedRowKeys
}) => {

    const [openModal, setOpenModal] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState<string>("");
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const deleteMutation = useDeleteBook();

    const handleDelete = (bookId: string) => {
        setSelectedBookId(bookId);
        setIsConfirmModalOpen(true);
    };

    const confirmDeleteBook = () => {
        setIsConfirmModalOpen(false);
        deleteMutation.mutate(selectedBookId);
    };

    const columns: TableColumnsType<Book> = [
        {
            title: "",
            key: "action",
            render: (_: Book, record: Book) => (
                <ActionButtons
                    handleUpdate={() => {
                        setSelectedBookId(record._id);
                        setOpenModal(true);
                    }}
                    handleDelete={() => handleDelete(record._id)}
                />
            ),
        },
        {
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
            render: (text: string, record: Book) => (
                <Link href={`/books/${record._id}`} className="flex items-center gap-2">
                    <Avatar
                        shape="square"
                        size={32}
                        src={record.coverImage || null}
                        style={{
                            backgroundColor: !record.coverImage ? '#87d068' : 'transparent',
                            color: !record.coverImage ? '#fff' : undefined,
                        }}
                    >
                        {!record.coverImage ? text.charAt(0).toUpperCase() : null}
                    </Avatar>
                    <span>{text}</span>
                </Link>
            ),
            sorter: (a, b) => a.title.localeCompare(b.title),
        },

        {
            title: "Tác giả",
            dataIndex: "authors",
            key: "authors",
            render: (authors: { name: string }[]) =>
                authors.map(author => author.name).join(", "),
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (price: number) => (
                <span style={{ color: "green" }}>{price.toLocaleString()}đ</span>
            ),
        },

        {
            title: "Thể loại",
            dataIndex: "genres",
            key: "genres",
            render: (genres: string[]) =>
                genres.map((genre) => (
                    <Tag key={genre} color="blue">{genre}</Tag>
                )),
        },
        {
            title: "Nhà xuất bản",
            dataIndex: "publisher",
            key: "publisher",
        },
        {
            title: "Ngày xuất bản",
            dataIndex: "publishedDate",
            key: "publishedDate",
            render: (date: string) => date ? new Date(date).toLocaleDateString() : "N/A",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
    ];


    if (isLoading) {
        return <Loader />;
    }

    return (
        <BoxContent>
            <DataTableHeader
                onPageSizeChange={setPageSize}
                onSearch={setSearchValue}
                searchValue={searchValue}
                searchPlaceholder="Tìm kiếm sách"
                pageSize={pageSize}
            />

            <Table
                columns={columns}
                dataSource={data}
                rowKey="_id"
                pagination={false}
                scroll={{ x: "max-content" }}
                rowSelection={{
                    selectedRowKeys,
                    onChange: setSelectedRowKeys,
                }}
            />

            <div className="mt-4 flex justify-center">
                <Pagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalElement={totalElement}
                    handlePageChange={setCurrentPage}
                />
            </div>

            <BookModal openModal={openModal} setOpenModal={setOpenModal} bookId={selectedBookId} />

            <Modal
                title="Xác nhận xóa sách"
                open={isConfirmModalOpen}
                onOk={confirmDeleteBook}
                onCancel={() => setIsConfirmModalOpen(false)}
                okText="Xóa"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
            >
                <p>Bạn có chắc chắn muốn xóa sách này không?</p>
            </Modal>
        </BoxContent>
    );
};

export default BookTable;