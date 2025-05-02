'use client';

import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import withAuth from '@/HOC/withAuth';

const SidebarLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-main-bg md:ml-[280px] lg:ml-[300px] p-6">
        {children}
      </div>
    </>
  );
};

export default SidebarLayout;
