import React from 'react';
import { Avatar, Space } from 'antd';
import { FiSmile } from 'react-icons/fi';

import translateRole from '@/utils/translateRole';
import useMyInfo from '../hooks/useMyInfo';

const DashboardHeader = () => {
  const { data } = useMyInfo();

  return (
    <div
      style={{
        marginBottom: 16,
        border: '1px solid #e8e8e8',
        borderRadius: 4,
        background: 'linear-gradient(to right, #f0f9ff, #cbebff)',
        padding: '0px',
      }}
    >
      <header className="flex items-center justify-between p-4">
        {
          data?.data &&
          <Space size="large">
            <Avatar size={60} src={data?.data.avatar || null}>
              {!data?.data.avatar && data?.data.fullName.charAt(0).toUpperCase()}
            </Avatar>
            <div>
              <h2 className="text-primary md:text-xl text-base font-semibold mb-2">
                {translateRole(data?.data.role.name)}: {data?.data.fullName}
              </h2>
              <p className="flex items-center gap-1 text-sm text-gray-500 md:text-base">
                <FiSmile className="text-blue-500 flex-shrink-0" />
                Chào mừng {data?.data.fullName} đến với hệ thống quản lý thư viện
              </p>
            </div>
          </Space>
        }

        <img
          src="/img/icon/result.png"
          alt="Thống kê"
          style={{ height: '64px', marginLeft: 'auto' }}
        />
      </header>
    </div>
  );
};

export default DashboardHeader;
