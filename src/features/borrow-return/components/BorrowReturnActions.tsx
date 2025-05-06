import { Dropdown } from 'antd';
import { FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import { IoIosMore } from 'react-icons/io';

import { BorrowRecord } from '@/types/types';

interface BorrowReturnActionsProps {
  record: BorrowRecord;
  onReceiveBook: (record: any) => void;
  onNotifyUser: (record: any) => void;
}

const BorrowReturnActions: React.FC = ({
  record,
  onReceiveBook,
  onNotifyUser,
}) => {
  const menuItems = [
    {
      key: 'received-book',
      label: (
        <div
          onClick={() => onReceiveBook(record)}
          className="flex cursor-pointer items-center gap-2 p-1 font-semibold"
        >
          <FaCheckCircle className="text-green-500" />
          <span>Nhận sách</span>
        </div>
      ),
    },
    {
      key: 'send-mail',
      label: (
        <div
          onClick={() => onNotifyUser(record)}
          className="flex cursor-pointer items-center gap-2 p-1 font-semibold"
        >
          <FaEnvelope className="text-yellow-500" />
          <span>Gửi mail yêu cầu trả sách</span>
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

export default BorrowReturnActions;
