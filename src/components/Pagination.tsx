import React from 'react';
import { Pagination as AntPagination, ConfigProvider } from 'antd';

interface PaginationProps {
  currentPage: number;
  totalElement: number;
  pageSize: number;
  handlePageChange: (page: number) => void;
}

const Pagination: React.FC = ({
  currentPage,
  totalElement,
  pageSize,
  handlePageChange,
}) => {
  return (
    <div className="pagination-wrapper px-[10px] pt-[16px]">
      <ConfigProvider
        theme={{
          token: {
            colorBorder: '#435ebe',
            borderRadius: 4,
          },
          components: {
            Pagination: {
              itemActiveBg: '#435ebe',
            },
          },
        }}
      >
        <AntPagination
          current={currentPage}
          total={totalElement}
          pageSize={pageSize}
          onChange={handlePageChange}
          align="center"
          defaultPageSize={20}
          showSizeChanger={false}
          className="custom-pagination"
        />
      </ConfigProvider>
    </div>
  );
};

export default Pagination;
