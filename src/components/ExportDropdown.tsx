import React from 'react';
import { Dropdown, MenuProps } from 'antd';
import { FaFileExport } from 'react-icons/fa';

interface ExportDropdownProps {
  downloadPDF: () => void;
  downloadExcel: () => void;
}

const ExportDropdown: React.FC = ({ downloadPDF, downloadExcel }) => {
  const menuItems: MenuProps['items'] = [
    {
      key: 'pdf',
      label: 'Xuất file PDF',
      onClick: downloadPDF,
    },
    {
      key: 'excel',
      label: 'Xuất file Excel',
      onClick: downloadExcel,
    },
  ];

  return (
    <Dropdown menu={{ items: menuItems }} trigger={['click']}>
      <span className="mr-4 flex cursor-pointer text-sm font-semibold text-gray-600 hover:text-gray-700">
        <FaFileExport size={16} className="mr-1 text-gray-500" />
        Xuất file
      </span>
    </Dropdown>
  );
};

export default ExportDropdown;
