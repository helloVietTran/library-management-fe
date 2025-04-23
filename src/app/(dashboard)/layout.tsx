"use client"

import Footer from '@/components/Footer';
import Main from '@/components/Main';
import PageTransitionWrapper from '@/components/PageTransitionWrapper';
import Sidebar from '@/components/Sidebar';
import { App } from 'antd';

const SidebarLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <App>
      <PageTransitionWrapper>
        <div className='sidebar-layout'>
          <Sidebar />
          <Main>
            {children}
            <Footer />
          </Main>
        </div>
      </PageTransitionWrapper>
    </App>
  );
}

export default SidebarLayout;
