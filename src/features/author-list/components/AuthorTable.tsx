import React, { useState } from "react";
import { Table, TableColumnsType, Avatar, message } from "antd";
import Link from "next/link";

import BoxContent from '@/components/BoxContent';
import Pagination from "@/components/Pagination";
import DataTableHeader from "@/components/DataTableHeader";
import ActionButtons from "@/components/ActionButtons";
import AuthorModal from "./AuthorModal";
import Loader from "@/components/Loader";
import { Author } from "@/types/types";
import useAuthors from "../hooks/useAuthors";

const AuthorTable = ({
}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchValue, setSearchValue] = useState<string>("");
    const [openModal, setOpenModal] = useState(false);

    const [selectedAuthorId, setSelectedAuthorId] = useState<string | undefined>(undefined);

    const { data: authorData, isLoading, error } = useAuthors(currentPage, pageSize, searchValue);

    // search author
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleSearch = (value: string) => {
        setSearchValue(value);
    };
    const handlePageSizeChange = (value: number) => {
        setPageSize(value);
    }

    // define columns
    const columns: TableColumnsType<Author> = [
        {
            title: "",
            key: "action",
            render: (_: Author, record: Author) => (
                <ActionButtons
                    handleUpdate={() => {
                        setSelectedAuthorId(record._id);
                        setOpenModal(true);
                    }}
                />
            )
        },
        {
            title: 'Tên tác giả',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: Author) => (
                <Link
                    href={`/authors/${record._id}`}
                    className="flex items-center gap-4"
                >
                    <Avatar src={record.imgSrc || '/img/default-avatar.png'} alt={text} />
                    <span>{text}</span>
                </Link>

            ),
            sorter: (a: Author, b: Author) => a.name.localeCompare(b.name),
        },
        {
            title: "Giới thiệu",
            dataIndex: "biography",
            key: "biography",
            minWidth: 200
        },
        {
            title: "Ngày sinh",
            dataIndex: "dob",
            key: "dob",
        },
        {
            title: "Quốc tịch",
            dataIndex: "nationality",
            key: "nationality",
        },
        {
            title: "Giải thưởng",
            dataIndex: "awards",
            key: "awards",
            minWidth: 200,
            render: (text: string[], record: Author) => (
                <p>
                    {
                        text.join(", ")
                    }
                </p>
            ),
        },

    ];

    if (isLoading) {
        return <Loader />
    }

    if (error) {
        return <div className="text-red-500 text-center">Lỗi khi tải dữ liệu tác giả.</div>;
    }
    return (
        <BoxContent>
            <DataTableHeader
                onPageSizeChange={handlePageSizeChange}
                onSearch={handleSearch}
                searchValue={searchValue}
                searchPlaceholder="Tìm kiếm tác giả"
                pageSize={pageSize}
            />
            <Table
                columns={columns}
                dataSource={authorData.data}
                rowKey="_id"
                pagination={false}
                scroll={{ x: "max-content" }}

            />

            <div className="mt-4 flex justify-center">
                <Pagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalElement={authorData.totalElement}
                    handlePageChange={handlePageChange}
                />
            </div>

            <AuthorModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                authorId={selectedAuthorId}
            />
        </BoxContent>
    );
};

export default AuthorTable;
