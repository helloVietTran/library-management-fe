import React from 'react';
import { Divider, Rate } from 'antd';
import { notFound, useParams } from 'next/navigation';
import { GoStarFill } from 'react-icons/go';

import Loader from '@/components/Loader';
import BoxContent from '@/components/BoxContent';
import PageTitle from '@/components/PageTitle';
import AboutAuthor from './components/AboutAuthor';
import MaskDescription from '@/components/MaskDescription';
import Slider from '@/components/Slider';
import BookInfo from './components/BookInfo';
import BookCard from './components/BookCard';
import CommunityReviews from './components/CommunityReviews';
import useFetchBookById from './hooks/useFetchBookById';
import ReviewList from './components/ReviewList';
import SplashScreen from '@/components/SplashScreen';
import { mockBooks } from '@/_mock/data';
import { Author } from '@/interfaces/commom';
import Footer from '@/components/Footer';

const BookDetail: React.FC = () => {
  const titles = [
    { label: 'Số trang', key: 'pageCount' },
    { label: 'Nhà xuất bản', key: 'publisher' },
    { label: 'Ngôn ngữ', key: 'language' },
  ];

  const params = useParams();
  const id = params.id as string;

  const { data: bookData, isLoading, isError } = useFetchBookById(id);
  if (isLoading) {
    return <Loader />;
  }

  if (isError || !bookData?.data) {
    notFound();
  }

  const book = bookData?.data;

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="book-detail">
      <SplashScreen />
      <PageTitle
        title="Thông tin chi tiết"
        breadcrumbs={[
          { label: 'DS đầu sách', href: '/books' },
          {
            label: bookData?.data.title,
            href: `/books/${book._id}`,
            isActive: true,
          },
        ]}
      />
      <BoxContent className="mt-4">
        <div className="flex flex-col py-8 md:flex-row">
          <div className="flex-shrink-0 md:w-1/4">
            <div className="mx-auto w-[80%]">
              <img
                src={book.coverImage || '/img/default/default-book.png'}
                alt="Book Cover"
                className="h-auto w-full rounded-lg shadow"
              />
              <p className="mt-4 text-center font-semibold text-green-700">
                {book.price + ' VND'}
              </p>
            </div>
          </div>

          {/* Right: Book Details */}
          <div className="mt-6 flex-1 md:mt-0 md:ml-6">
            <h2 className="text-primary mb-2 text-xl font-semibold">
              {book.title}
            </h2>

            <p className="mb-2 text-lg text-sm text-gray-700">
              by {book.authors.map((author: Author) => author.name).join(', ')}
            </p>

            <div className="mb-4 flex items-center gap-2">
              <Rate
                disabled
                defaultValue={book.rating || 3.5}
                allowHalf
                character={<GoStarFill />}
                className="star-icon"
              />
              <div>
                <span className="text-lg font-semibold">
                  {book.rating || 3.5}
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  được đánh giá từ cộng đồng
                </span>
              </div>
            </div>

            <Divider className="custom-divider" />
            <MaskDescription
              className="mb-6 text-sm"
              content={book.description || 'Không có mô tả'}
            />
            <Divider className="custom-divider" />

            <BookInfo titles={titles} content={book} genres={book.genres} />
            <Divider className="custom-divider" />

            <div className="about-author">
              <span className="mb-2 font-semibold text-gray-600">
                Về tác giả
              </span>

              {book.authors.map((author) => (
                <AboutAuthor data={author} key={author._id} />
              ))}
            </div>

            <Divider className="custom-divider" />
          </div>
        </div>

        <div className="mb-4 px-6">
          <p className="mb-2 mb-4 text-xl font-semibold text-gray-600">
            Đề xuất cho độc giả
          </p>
          <Slider data={mockBooks} SliderCard={BookCard} />
        </div>

        <div className="mb-4 px-6">
          <CommunityReviews />
          <ReviewList />
        </div>
      </BoxContent>
      <Footer />
    </div>
  );
};

export default BookDetail;
