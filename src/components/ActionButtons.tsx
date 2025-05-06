import React from 'react';
import { Dropdown } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IoIosMore } from 'react-icons/io';
import { FaRegBell } from 'react-icons/fa';

interface ActionButtonsProps {
  handleUpdate: () => void;
  handleDelete?: (value: any) => void;
  handleNotification?: () => void;
}

const ActionButtons: React.FC = ({
  handleNotification,
  handleUpdate,
  handleDelete,
}) => {
  const menuItems = [
    {
      key: 'edit',
      label: (
        <div
          onClick={handleUpdate}
          className="flex cursor-pointer items-center px-2 font-semibold text-gray-600"
        >
          <EditOutlined
            style={{ color: '#25396f', fontSize: '14px', marginRight: '8px' }}
          />
          Sửa
        </div>
      ),
    },

    ...(handleDelete
      ? [
          {
            key: 'delete',
            label: (
              <div
                onClick={handleDelete}
                className="flex cursor-pointer items-center px-2 font-semibold text-gray-600"
              >
                <DeleteOutlined
                  style={{
                    color: '#FF0000',
                    fontSize: '14px',
                    marginRight: '8px',
                  }}
                />
                Xóa
              </div>
            ),
          },
        ]
      : []),
    ...(handleNotification
      ? [
          {
            key: 'notification',
            label: (
              <div
                onClick={handleNotification}
                className="flex cursor-pointer items-center px-2 font-semibold text-gray-600"
              >
                <FaRegBell
                  className="mr-2 text-yellow-500 hover:text-yellow-600"
                  size={16}
                />
                Thông báo
              </div>
            ),
          },
        ]
      : []),
  ];

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={['click']}
      className="cursor-pointer"
    >
      <IoIosMore className="cursor-pointer" />
    </Dropdown>
  );
};

export default ActionButtons;
