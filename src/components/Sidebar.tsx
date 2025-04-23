import React from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';

const Sidebar = () => {
    return (
        <div className='sidebar-wrapper w-[300px] h-screen fixed top-0 bottom-0 z-10 overflow-y-auto'>
            <SidebarHeader />
            <SidebarMenu />
        </div>
    )
}

export default Sidebar;

