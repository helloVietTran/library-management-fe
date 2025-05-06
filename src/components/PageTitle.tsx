import Link from 'next/link';
import React from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface PageTitleProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
}

const PageTitle: React.FC = ({ title, subtitle, breadcrumbs }) => {
  return (
    <div className="page-title text-primary mb-3 text-xl">
      <div className="flex flex-row items-start justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="mb-1 hidden text-xl font-medium text-gray-800 md:block">
            {title}
          </h3>
          {subtitle && <p className="text-sm">{subtitle}</p>}
        </div>
        <nav>
          <ol className="flex space-x-2 text-sm">
            {breadcrumbs.map((breadcrumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li key={index}>
                  {breadcrumb.href && !isLast ? (
                    <Link
                      href={breadcrumb.href}
                      className="font-medium !text-gray-500 hover:!text-gray-800"
                    >
                      {breadcrumb.label} /
                    </Link>
                  ) : (
                    <span className="font-medium text-gray-800">
                      {breadcrumb.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default PageTitle;
