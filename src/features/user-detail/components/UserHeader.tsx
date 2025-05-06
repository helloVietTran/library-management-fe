import React from 'react';
import { Avatar, Dropdown } from 'antd';
import { CgMoreO } from 'react-icons/cg';
import { GoBlocked } from 'react-icons/go';
import { AiOutlineSafety } from 'react-icons/ai';

import translateRole from '@/utils/translateRole';
import { useParams } from 'next/navigation';
import { User } from '@/interfaces/commom';
import useBorrowedQuantity from '../hooks/useBorrowedQuantity';

interface UserHeaderProps {
  data: User;
}

const UserHeader: React.FC = ({ data }) => {
  const params = useParams();
  const id = params.id as string;

  const { data: borrowedQuantityData } = useBorrowedQuantity(data._id);

  // không thể sửa chính bản thân
  const isDisabled = id === data._id;

  const menuItems = [
    {
      key: 'block-user',
      label: (
        <div
          onClick={() => {}}
          className="flex cursor-pointer items-center px-2 font-semibold text-gray-600"
        >
          <GoBlocked className="mr-2 size-4 text-red-500" />
          Chặn người dùng
        </div>
      ),
    },
    {
      key: 'promote-user-by-admin',
      label: (
        <div
          onClick={() => {}}
          className="flex cursor-pointer items-center px-2 font-semibold text-gray-600"
        >
          <AiOutlineSafety className="mr-2 text-blue-500" />
          Phân quyền
        </div>
      ),
      children: [
        {
          key: 'promote-librarian',
          label: (
            <div className="flex items-center">
              <AiOutlineSafety className="mr-2 text-green-500" />
              Thủ thư
            </div>
          ),
        },
        {
          key: 'promote-user',
          label: (
            <div className="flex items-center">
              <AiOutlineSafety className="mr-2 text-purple-500" />
              Người dùng
            </div>
          ),
        },
      ],
    },
  ];

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <div>
          <h2 className="text-primary text-xl font-bold">{data.fullName}</h2>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
            <span>@{data.email}</span>
            <span className="rounded-full bg-gray-800 px-2 py-1 text-xs text-white">
              {translateRole(data?.role?.name || 'user')}
            </span>
          </div>
        </div>
        <Avatar
          src={data.avatar || '/img/default/default-avatar.png'}
          alt={data.fullName}
          size={64}
        />
      </div>

      <p className="mt-4 mb-2 text-sm text-gray-700">
        {data?.bio || 'Loving books, coding, and coffee ☕'}
      </p>

      <div className="flex w-full items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <span>Đã đọc: {data.readBooksCount}</span>
          <div className="h-1 w-1 rounded-full bg-gray-500"></div>
          <span className="text-blue-500">
            Đang mượn: {borrowedQuantityData?.data.quantity || 0}
          </span>
        </div>

        {!isDisabled && (
          <div className="flex gap-3">
            <Dropdown
              menu={{ items: menuItems }}
              trigger={['click']}
              className="cursor-pointer"
            >
              <CgMoreO size={22} className="cursor-pointer" />
            </Dropdown>
          </div>
        )}
      </div>

      <span className="mt-6 mb-2 cursor-pointer border-b-2 border-black pb-2 font-semibold">
        Bình luận
      </span>
    </div>
  );
};

export default UserHeader;
