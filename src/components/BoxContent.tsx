import React from 'react';

interface BoxContentProps {
  children: React.ReactNode;
  className?: string;
}

const BoxContent: React.FC = ({ children, className = '' }) => {
  return (
    <div className={`rounded-lg bg-white p-4 shadow ${className}`}>
      {children}
    </div>
  );
};

export default BoxContent;
