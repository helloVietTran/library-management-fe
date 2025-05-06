import React from 'react';
import { Dropdown } from 'antd';
import { IoIosMore } from 'react-icons/io';
import { BsCash } from 'react-icons/bs';

interface FineActionButtonsProps {
  handleConfirmPayment: () => void;
}

const FineActionButtons: React.FC = ({ handleConfirmPayment }) => {
  const menuItems = [
    {
      key: 'confirmPayment',
      label: (
        <div
          onClick={handleConfirmPayment}
          className="flex cursor-pointer items-center px-2 font-semibold text-gray-600"
        >
          <BsCash
            className="mr-2 text-green-600 hover:text-green-700"
            size={16}
          />
          Xác nhận thu tiền
        </div>
      ),
    },
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

export default FineActionButtons;
