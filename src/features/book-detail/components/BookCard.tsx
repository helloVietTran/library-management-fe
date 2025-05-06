import React from 'react';
import Link from 'next/link';

interface BookCardProps {
  data: Pick;
}

const BookCard: React.FC = ({ data }) => {
  return (
    <div className="book-card">
      <Link href={`/books/${data.id}`}>
        <img
          src={data.imgSrc}
          alt={data.title}
          className="inline-block h-[240px] w-full rounded-lg object-cover"
        />
      </Link>
      <Link href={`/books/${data.id}`}>
        <h3 className="mt-[10px] mb-[4px] font-semibold text-gray-700 hover:underline">
          {data.title}
        </h3>
      </Link>
      <p className="text-sm text-gray-500">
        {[...data.authorNames].map((author, index, array) => {
          return (
            <span key={author}>
              {author}
              {index < array.length - 1 && ' - '}
            </span>
          );
        })}
      </p>
    </div>
  );
};

export default BookCard;
