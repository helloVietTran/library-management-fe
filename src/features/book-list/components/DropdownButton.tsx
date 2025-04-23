import React from 'react';
import type { MenuProps } from 'antd';
import { ConfigProvider, Dropdown, message, Space } from 'antd';
import { FaAngleDown } from "react-icons/fa6";
import { RiDeleteBack2Line, RiSettingsLine } from 'react-icons/ri';
import { FiPlus } from 'react-icons/fi';

interface DropdownButtonProps {
    onOpenModal: () => void;
    onDelete: () => void;
    onUpdate: () => void;
}


const DropdownButton: React.FC<DropdownButtonProps> = ({
    onOpenModal,
    onDelete,
    onUpdate
}) => {
    const handleMenuClick: MenuProps["onClick"] = (e) => {
        if (e.key === "update") {
            onUpdate();
        } else if (e.key === "delete") {
            onDelete();
        }
    };

    const items: MenuProps["items"] = [
        {
            label: "Chỉnh sửa",
            key: "update",
            icon: <RiSettingsLine size={16} color="#1890ff" />,
        },
        {
            label: "Xóa",
            key: "delete",
            icon: <RiDeleteBack2Line size={14} className="rotate-180" color="#ff4d4f" />,
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    return (
        <Space wrap>
            <ConfigProvider
                theme={{
                    token: {
                        fontFamily: "Nunito",
                        colorBgContainer: "#445ebf",
                        colorPrimaryHover: "#fff",

                    },
                    components: {
                        Button: {
                            colorText: "#fff",

                        },
                    },
                }}
            >
                <Dropdown.Button
                    menu={menuProps}
                    onClick={onOpenModal}
                    icon={<FaAngleDown />}
                >
                    <FiPlus size={18} />
                    Thêm
                </Dropdown.Button>
            </ConfigProvider>
        </Space>
    );
}

export default DropdownButton;