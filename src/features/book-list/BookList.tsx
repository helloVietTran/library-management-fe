import React, { Key, useState } from 'react'
import { Button, message } from 'antd';
import { FiPlus } from 'react-icons/fi';
import "jspdf-autotable";
import { DeleteOutlined } from '@ant-design/icons';

import "@/config/font/TimesNewRoman";
import ToggleOverviewButton from '@/components/ToggleOverviewButton';
import dowloadExcel from '@/utils/downloadExcel';
import ExportDropdown from '@/components/ExportDropdown';
import BookOverview from './components/BookOverview';
import BookModal from './components/BookModal';
import BookTable from './components/BookTable';
import PageTitle from '@/components/PageTitle';
import useBooks from './hooks/useBooks';
import downloadPDF from '@/utils/dowloadPDF';
import useDeleteManyBooks from './hooks/useDeleteManyBooks';


const BookList = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openOverview, setOpenOverview] = useState<boolean>(true);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [searchValue, setSearchValue] = useState<string>("");

    const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

    const deleteManyMutation = useDeleteManyBooks();

    const handleDeleteMany = () => {
        if (selectedRowKeys.length === 0) return;

        deleteManyMutation.mutate(selectedRowKeys);
        
        message.success(`Đã xoá ${selectedRowKeys.length} sách`);
        setSelectedRowKeys([]);
    };

    const { data: bookData, isLoading } = useBooks(currentPage, pageSize, searchValue);

    const headers = [
        { id: "title", header: "Tiêu đề" },
        { id: "authors", header: "Tác giả" },
        { id: "publishedDate", header: "Ngày xuất bản" },
        { id: "language", header: "Ngôn ngữ" },
        { id: "pageCount", header: "Số trang" },
        { id: "price", header: "Giá" },
    ];

    const handleExportExcel = () => {
        if (!bookData.data) {
            message.info("Đang tải dữ liệu")
            return;
        }
        dowloadExcel(bookData.data, headers, "Book_Data");
    };

    const handleExportPDF = () => {
        if (!bookData.data) {
            message.info("Đang tải dữ liệu")
            return;
        }
        downloadPDF(bookData.data, headers, "Book_Data");
    };

    const showModal = () => {
        setOpenModal(true);
    };

    return (
        <div className='book-list'>
            <PageTitle
                title="Quản lý sách"
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: "QL sách", href: '/books', isActive: true }
                ]}
            />
            <BookOverview
                openOverview={openOverview}
            />

            <div className='page-content'>
                <div className='flex justify-between items-center mb-4'>
                    <div className='flex gap-2 items-center'>
                        <ToggleOverviewButton
                            openOverview={openOverview}
                            setOpenOverview={() => setOpenOverview(!openOverview)}
                        />
                        {
                            selectedRowKeys.length > 0 &&
                            <button
                                className="text-gray-500 hover:text-red-500 relative cursor-pointer hover:bg-red-100 rounded-full p-1 transition-colors duration-200"
                                onClick={handleDeleteMany}
                            >
                                <DeleteOutlined className="text-lg" />
                                <span
                                    className="absolute top-0 -right-1 bg-red-500 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full"
                                >
                                    {selectedRowKeys.length}
                                </span>
                            </button>
                        }
                    </div>
                    <div className='flex gap-2 items-center'>
                        <ExportDropdown
                            downloadExcel={handleExportExcel}
                            downloadPDF={handleExportPDF}
                        />
                        <Button
                            onClick={showModal}
                            type='primary'
                            icon={<FiPlus size={18} />}
                            size="middle"
                            className='text-sm'
                        >
                            Thêm
                        </Button>
                    </div>
                </div>

                <BookTable
                    data={bookData?.data || []}
                    totalElement={bookData?.totalElement || 0}
                    isLoading={isLoading}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    searchValue={searchValue}
                    setCurrentPage={setCurrentPage}
                    setPageSize={setPageSize}
                    setSearchValue={setSearchValue}
                    selectedRowKeys={selectedRowKeys}
                    setSelectedRowKeys={setSelectedRowKeys}
                />

                <BookModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                />
            </div>
        </div>
    )
}

export default BookList;