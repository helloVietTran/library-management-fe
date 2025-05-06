import React from 'react';

interface TitleItem {
  label: string;
  key: string;
}

interface AuthorInfoProps {
  titles: TitleItem[];
  content: any;
  awards?: string[];
  className?: string;
}

const AuthorInfo: React.FC = ({ titles, content, awards, className }) => {
  return (
    <div
      className={`table w-full border-separate border-spacing-4 ${className}`}
    >
      {titles.map((title, index) => (
        <div className="table-row" key={index}>
          <div className="info-table-title text-primary table-cell w-[15%] text-sm font-semibold">
            {title.label}
          </div>
          <div className="table-cell">{content[title.key]}</div>
        </div>
      ))}

      {awards && awards.length > 0 && (
        <div className="table-row">
          <div className="info-table-title text-primary table-cell w-[15%] text-sm font-semibold">
            Giải thưởng
          </div>
          <div className="table-cell">
            {awards.map((award) => (
              <span key={award} className="award-badge">
                {award}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorInfo;
