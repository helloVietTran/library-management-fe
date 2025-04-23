import React from "react";
import { Avatar, Space, Typography, Button } from "antd";
import { FiSmile } from "react-icons/fi";
import Link from "next/link";

import translateRole from "@/utils/translateRole";
import { User } from "@/types/types";

const { Title, Text } = Typography;

interface DashboardHeaderProps {
  user: User | null;
  statsImageUrl?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  user,
  statsImageUrl = "/img/icon/result.png",
}) => {
  return (
    <div
      style={{
        marginBottom: 16,
        border: "1px solid #e8e8e8",
        borderRadius: 4,
        background: "linear-gradient(to right, #f0f9ff, #cbebff)",
        padding: "0px",
      }}
    >
      <header className="flex items-center justify-between p-4">
        {user ? (
          <Space size="large">
            <Avatar size={60} src={user.avatar}>
              {!user.avatar && user.fullName.charAt(0).toUpperCase()}
            </Avatar>
            <div>
              <h2 className="text-primary text-xl font-semibold mb-2">
                {translateRole(user.role.name)}: {user.fullName}
              </h2>
              <p className="flex items-center text-sm text-gray-500">
                <FiSmile className="mr-1 text-blue-500" />
                Chào mừng {user.fullName} đến với hệ thống quản lý thư viện
              </p>
            </div>
          </Space>
        ) : (
          <div>
            <Title level={5} style={{ marginBottom: 4 }} className="text-primary">
              <Link href="/login">
                Vui lòng đăng nhập!
              </Link>
            </Title>

          </div>
        )}

        {statsImageUrl && (
          <img
            src={statsImageUrl}
            alt="Thống kê"
            style={{ height: "64px", marginLeft: "auto" }}
          />
        )}
      </header>
    </div>
  );
};

export default DashboardHeader;
