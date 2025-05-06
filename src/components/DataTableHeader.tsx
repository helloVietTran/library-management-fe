import React from 'react';
import { CiSearch } from 'react-icons/ci';

interface DataTableHeaderProps {
  onPageSizeChange: (value: number) => void;
  onSearch: (value: string) => void;
  searchValue: string;
  searchPlaceholder?: string;
  pageSize?: number;
}

const DataTableHeader: React.FC = ({
  onPageSizeChange,
  onSearch,
  searchValue,
  searchPlaceholder = 'Search...',
  pageSize = 10,
}) => {
  return (
    <div>
      <div className="flex justify-between py-[12px]">
        <div className="relative">
          <input
            placeholder={searchPlaceholder}
            className="data-table-input w-[300px] rounded bg-white pl-12"
            onChange={(e) => onSearch(e.target.value)}
            value={searchValue}
          />
          <CiSearch
            className="absolute top-1/2 left-3 -translate-y-1/2 transform"
            color="#555252"
            size={20}
          />
        </div>

        <div className="flex items-center space-x-2">
          <select
            className="entry-per-page rounded p-2 text-base"
            defaultValue={pageSize}
            onChange={(e) => onPageSizeChange(+e.target.value)}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
          <span className="text-sm text-gray-700">tài liệu / trang</span>
        </div>
      </div>
    </div>
  );
};

export default DataTableHeader;
