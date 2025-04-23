import React, { useState } from "react";
import { Modal, Button, Input, Select } from "antd";
import { FaFilter } from "react-icons/fa";

const { Option } = Select;

const FilterButton = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [filterValues, setFilterValues] = useState({
        title: "",
        author: "",
        publisher: "",
        quantity: false,
    });

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFilterValues({
            ...filterValues,
            [field]: e.target.value,
        });
    };

    const handleSelectChange = (value: string, field: string) => {
        setFilterValues({
            ...filterValues,
            [field]: value,
        });
    };

    // Hàm xử lý submit lọc
    const handleSubmit = () => {
        console.log("Lọc theo các tiêu chí:", filterValues);
        setIsModalVisible(false);  // Đóng modal sau khi lọc
    };

    return (
        <div className="flex items-center">
            <button
                className="filter-button p-3 rounded-lg"
                onClick={showModal}
            >
                <FaFilter
                    size={16}
                    color="rgba(56, 116, 255, 1)"
                    className="cursor-pointer"
                />
            </button>

            <Modal
                title={
                    <h3 className="text-primary text-lg font-semibold pb-4 border-b">Tìm kiếm sách</h3>
                }
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Hủy
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleSubmit}>
                        Lọc
                    </Button>,
                ]}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold">Tiêu đề</label>
                        <Input
                            size="large"
                            value={filterValues.title}
                            onChange={(e) => handleInputChange(e, "title")}
                            className="mt-1"
                            placeholder="Nhập tiêu đề"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold">Tác giả</label>
                        <Input
                            size="large"
                            value={filterValues.author}
                            onChange={(e) => handleInputChange(e, "author")}
                            className="mt-1"
                            placeholder="Nhập tên tác giả"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold">NXB</label>
                        <Input
                            size="large"
                            value={filterValues.publisher}
                            onChange={(e) => handleInputChange(e, "publisher")}
                            className="mt-1"
                            placeholder="Nhập tên NXB"
                        />
                    </div>


                </div>
            </Modal>
        </div>
    );
};

export default FilterButton;
