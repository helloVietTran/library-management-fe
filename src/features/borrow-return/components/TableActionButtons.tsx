import React from 'react';
import { Tooltip } from 'antd';
import { TiEdit } from 'react-icons/ti';
import { FaRegBell, FaTrashAlt } from 'react-icons/fa';

interface TableActionButtonsProps {
  handleUpdate: () => void;
  handleDelete: () => void;
  handleNotification?: () => void;
}

const TableActionButtons: React.FC = ({
  handleNotification,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <div className="table-action-buttons flex items-center gap-2">
      <Tooltip title="Sửa">
        <button
          onClick={handleDelete}
          className="rounded-full p-2 transition duration-200 ease-in-out hover:bg-blue-100"
        >
          <TiEdit className="text-primary" size={21} />
        </button>
      </Tooltip>

      <Tooltip title="Xóa">
        <button
          onClick={handleUpdate}
          className="rounded-full p-2 transition duration-200 ease-in-out hover:bg-red-100"
        >
          <FaTrashAlt className="text-red-500 hover:text-red-600" size={14} />
        </button>
      </Tooltip>

      {handleNotification && (
        <Tooltip title="Gửi thông báo">
          <button
            onClick={handleNotification}
            className="rounded-full p-2 transition duration-200 ease-in-out hover:bg-yellow-100"
          >
            <FaRegBell
              className="text-yellow-500 hover:text-yellow-600"
              size={16}
            />
          </button>
        </Tooltip>
      )}
    </div>
  );
};

export default TableActionButtons;
