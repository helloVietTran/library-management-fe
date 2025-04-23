import React from "react";
import { Divider, Rate } from 'antd';
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { GoStarFill } from "react-icons/go";

import Loader from "@/components/Loader";
import BoxContent from "@/components/BoxContent";
import PageTitle from "@/components/PageTitle";
import AboutAuthor from "./components/AboutAuthor"
import MaskDescription from "@/components/MaskDescription";
import Slider from "@/components/Slider";
import BookInfo from "./components/BookInfo";
import BookCard from "./components/BookCard";
import ReviewCard from "./components/ReviewCard";
import CommunityReviews from "./components/CommunityReviews";
import useBookDetail from "./hooks/useBookDetail";

import { Author } from "@/types/types";
import ReviewList from "./components/ReviewList";

export const mockBooks: any[] = [
    {
        id: 1,
        title: "The Art of Programming",
        imgSrc: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388800064i/9648068.jpg",
        publisher: "TechBooks Publishing Co.",
        publishedAt: "2023-06-15",
        format: "Hardcover",
        language: "English",
        isbn: "978-1234567890",
        price: "49.99",
        version: "2nd Edition",
        authorNames: ["Donald Knuth", "Alan Turing"],
        genreNames: ["Computer Science", "Programming", "Education"],
        reviewCount: 1,
        ratingPoint: 3.5,
        description: "A comprehensive guide to the art and science of programming, written by some of the greatest minds in the field.",
        pageNumber: 100,
        quantity: 3,
        shelfLocation: "Giá 4 Ngăn 3"
    },
    {
        id: 2,
        title: "Mastering Data Structures",
        imgSrc: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388800064i/9648068.jpg",
        publisher: "DataMaster Press",
        publishedAt: "2022-03-10",
        format: "Paperback",
        language: "English",
        isbn: "978-0987654321",
        price: "$39.99",
        authorNames: ["Robert Lafore"],
        genreNames: ["Computer Science", "Algorithms"],
        reviewCount: 1,
        ratingPoint: 3.5,
        description: "An in-depth exploration of data structures and algorithms, designed for both beginners and experienced developers.",
        pageNumber: 100,
        quantity: 3,
        shelfLocation: "Giá 4 Ngăn 3"
    },
    {
        id: 3,
        title: "Learn JavaScript in 24 Hours",
        imgSrc: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388800064i/9648068.jpg",
        publisher: "QuickLearn Books",
        publishedAt: "2021-08-25",
        format: "Ebook",
        language: "English",
        isbn: "978-5678901234",
        price: "$19.99",
        authorNames: ["Mark Zuckerberg"],
        genreNames: ["Programming", "JavaScript"],
        reviewCount: 1,
        ratingPoint: 3.5,
        description: "A quick and easy guide to mastering JavaScript programming in just 24 hours.",
        pageNumber: 100,
        quantity: 3,
        shelfLocation: "Giá 4 Ngăn 3"
    },
    {
        id: 1,
        title: "The Art of Programming",
        imgSrc: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388800064i/9648068.jpg",
        publisher: "TechBooks Publishing Co.",
        publishedAt: "2023-06-15",
        format: "Hardcover",
        language: "English",
        isbn: "978-1234567890",
        price: "49.99",
        version: "2nd Edition",
        authorNames: ["Donald Knuth", "Alan Turing"],
        genreNames: ["Computer Science", "Programming", "Education"],
        reviewCount: 1,
        ratingPoint: 3.5,
        description: "A comprehensive guide to the art and science of programming, written by some of the greatest minds in the field.",
        pageNumber: 100,
        quantity: 3,
        shelfLocation: "Giá 4 Ngăn 3"
    },
    {
        id: 2,
        title: "Mastering Data Structures",
        imgSrc: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388800064i/9648068.jpg",
        publisher: "DataMaster Press",
        publishedAt: "2022-03-10",
        format: "Paperback",
        language: "English",
        isbn: "978-0987654321",
        price: "$39.99",
        authorNames: ["Robert Lafore"],
        genreNames: ["Computer Science", "Algorithms"],
        reviewCount: 1,
        ratingPoint: 3.5,
        description: "An in-depth exploration of data structures and algorithms, designed for both beginners and experienced developers.",
        pageNumber: 100,
        quantity: 3,
        shelfLocation: "Giá 4 Ngăn 3"
    },
    {
        id: 3,
        title: "Learn JavaScript in 24 Hours",
        imgSrc: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388800064i/9648068.jpg",
        publisher: "QuickLearn Books",
        publishedAt: "2021-08-25",
        format: "Ebook",
        language: "English",
        isbn: "978-5678901234",
        price: "$19.99",
        authorNames: ["Mark Zuckerberg"],
        genreNames: ["Programming", "JavaScript"],
        reviewCount: 1,
        ratingPoint: 3.5,
        description: "A quick and easy guide to mastering JavaScript programming in just 24 hours.",
        pageNumber: 100,
        quantity: 3,
        shelfLocation: "Giá 4 Ngăn 3"
    },
];


const BookDetail: React.FC = () => {

    const titles = [
        { label: "Số trang", key: "pageCount" },
        { label: "Nhà xuất bản", key: "publisher" },
        { label: "ISBN", key: "ISBN" },
        { label: "Ngôn ngữ", key: "language" },
    ];

    const params = useParams();
    const id = params.id as string;

    const { data: book, isLoading, isError } = useBookDetail(id);

    if (isLoading) {
        return <Loader />
    }

    if (!book || isError) {
        notFound();
    }

    return (
        <div className="book-detail">
            <PageTitle
                title="Thông tin chi tiết"
                breadcrumbs={[
                    { label: 'DS đầu sách', href: '/books' },
                    { label: book.title, href: `/books/${book._id}`, isActive: true }
                ]}
            />
            <BoxContent className="mt-4">
                <div className="flex flex-col md:flex-row py-8">
                    {/* Left: Book Image */}
                    <div className="flex-shrink-0 md:w-1/4">
                        <div className="w-[80%] mx-auto">
                            <img
                                src={book.coverImage || "/img/default-book.png"}
                                alt="Book Cover"
                                className="w-full h-auto rounded-lg shadow"
                            />
                            <p className="text-center text-green-700 font-semibold mt-4">{book.price + " VND"}</p>
                        </div>
                    </div>

                    {/* Right: Book Details */}
                    <div className="flex-1 md:ml-6 mt-6 md:mt-0">
                        <h2 className="text-xl font-semibold mb-2 text-primary">{book.title}</h2>

                        <p className="text-gray-700 text-lg mb-2 text-sm">by  {" "}
                            {book.authors.map((author: Author) => (author.name)).join(', ')}
                        </p>

                        <div className="flex items-center gap-2 mb-4">
                            <Rate
                                disabled
                                defaultValue={book.rating || 3.5}
                                allowHalf
                                character={<GoStarFill />}
                                className="star-icon"
                            />
                            <div >
                                <span className="text-lg font-semibold">{book.rating || 3.5}</span>
                                <span className="text-xs text-gray-400 ml-2">được đánh giá từ cộng đồng</span>
                            </div>

                        </div>

                        <Divider className="custom-divider" />
                        <MaskDescription
                            className="mb-6 text-sm"
                            content={book.description || "Không có mô tả"}
                        />
                        <Divider className="custom-divider" />

                        <BookInfo titles={titles} content={book} genres={book.genres} />
                        <Divider className="custom-divider" />

                        <div className='about-author'>
                            <span className='font-semibold mb-2 text-gray-600'>
                                Về tác giả
                            </span>

                            {book.authors.map((author) => (
                                <AboutAuthor data={author} />
                            ))}
                        </div>

                        <Divider className="custom-divider" />

                    </div>
                </div>
                {/*  Book Slider */}
                <div className="mb-4 px-6">
                    <p className='text-xl font-semibold mb-2 text-gray-600 mb-4'>
                        Đề xuất cho độc giả
                    </p>
                    <Slider
                        data={mockBooks}
                        SliderCard={BookCard}
                    />
                </div>
                <div className="mb-4 px-6">
                    <CommunityReviews />
                    <ReviewList />
                </div>
            </BoxContent >
        </div >
    );
};

export default BookDetail;