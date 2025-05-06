import React from 'react';

interface TitleItem {
  label: string;
  key: string;
}

interface BookInfoProps {
  titles: TitleItem[];
  content: any;
  genres?: string[];
  className?: string;
}

const BookInfo: React.FC = ({ titles, content, genres, className }) => {
  return (
    <div
      className={`table w-full border-separate border-spacing-3 ${className}`}
    >
      {titles.map((title, index) => (
        <div className="table-row" key={index}>
          <div className="info-table-title text-primary table-cell text-sm font-semibold">
            {title.label}
          </div>
          <div className="table-cell">{content[title.key]}</div>
        </div>
      ))}

      {genres && genres.length > 0 && (
        <div className="table-row">
          <div className="info-table-title text-primary table-cell text-sm font-semibold">
            Thể loại
          </div>
          <div className="table-cell">
            {genres.map((genre) => (
              <span key={genre} className="genre-btn">
                <span className="genre-tag">{genre}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookInfo;
