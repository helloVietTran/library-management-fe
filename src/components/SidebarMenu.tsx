import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Menu, message } from 'antd';
import {
    BiPen,
    BiSolidGridAlt,
} from 'react-icons/bi';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { IoArrowUndoOutline, IoShieldOutline } from "react-icons/io5";
import { BsChatLeftDots } from "react-icons/bs";
import { GiChart } from 'react-icons/gi';
import { MenuProps } from 'antd';
import Link from 'next/link';
import { TbMoneybag } from 'react-icons/tb';
import { LuBookCopy } from 'react-icons/lu';
import { CiLogout } from "react-icons/ci";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import useAuthStore from '@/store/authStore';
import api from '@/config/axios';
import { removeAuthCookies } from '@/utils/cookie';

const SidebarMenu = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { isAuthenticated, logout } = useAuthStore();
    const router = useRouter();

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const accessToken = Cookies.get('lib_jwt_token');

            const res = await api.post("/auth/logout", {
                accessToken
            }, { withCredentials: true });


            return res.data;
        },
        onSuccess: () => {
            message.success("Đăng xuất thành công!");
            logout();
            removeAuthCookies();
            router.push("/login");
        },
        onError: () => {
            message.error("Đăng xuất thất bại!");
        },
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    }

    let menuItems: MenuProps['items'] = [
        {
            key: 'dashboard',
            label: <Link href="/">Tổng quan</Link>,
            icon: <BiSolidGridAlt size={18} />,
        },
        {
            key: 'books',
            label: <Link href="/books">QL sách</Link>,
            icon: <LuBookCopy size={18} />,
        },
        {
            key: 'chat-app',
            label: <Link href="/chat-app">Chat App</Link>,
            icon: <BsChatLeftDots size={18} />,
        },
        {
            key: 'borrow-return',
            label: <Link href="/borrow-return">QL mượn trả sách</Link>,
            icon: <IoArrowUndoOutline size={18} />,
        },
        {
            key: 'users',
            label: <Link href="/users">QL người dùng</Link>,
            icon: <AiOutlineUsergroupDelete size={20} />,
        },
        {
            key: 'authors',
            label: <Link href="/authors">QL tác giả</Link>,
            icon: <BiPen size={18} />,
        },
        {
            key: 'fines',
            label: <Link href="/fines">QL khoản phạt</Link>,
            icon: <TbMoneybag size={18} />
        },
        {
            key: 'statistic',
            label: <Link href="/statistic">Thống kê</Link>,
            icon: <GiChart size={16} />,
        },
        ...(isAuthenticated
            ? [
                {
                    key: 'logout',
                    label: <span onClick={handleLogout}>Đăng xuất</span>,
                    icon: <CiLogout size={18} />
                }
            ]
            : [
                {
                    key: 'authentication',
                    label: 'Xác thực',
                    icon: <IoShieldOutline size={18} />,
                    children: [
                        {
                            key: 'login',
                            label: <Link className='custom-sub-menu-link' href="/login">Đăng nhập</Link>
                        },
                        {
                            key: 'register',
                            label: <Link className='custom-sub-menu-link' href="/register">Đăng ký</Link>
                        }
                    ]
                }
            ])
    ];

    return (
        <div className='sidebar-menu'>
            <ul className='menu mt-6 px-6'>
                <li className="sidebar-title px-4 my-6 mb-4 text-base list-none font-bold">Menu</li>
                <Menu
                    className='custom-menu'
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['dashboard']}
                    items={menuItems}
                />

            </ul>
        </div>
    );
};

export default SidebarMenu;
