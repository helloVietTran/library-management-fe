import Link from 'next/link';
import React from 'react';

const SidebarHeader = () => {
    return (
        <div className='sidebar-header px-8 mt-8 mb-4'>
            <Link href='/'>
                <img
                    src="/img/logo/logo.png"
                    className='w-[60px] mx-auto'
                    alt='logo'
                />
            </Link>
        </div>
    )
}

export default SidebarHeader