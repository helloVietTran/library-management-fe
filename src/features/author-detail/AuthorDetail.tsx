import React from 'react';
import { Divider } from 'antd';
import { notFound, useParams } from "next/navigation";

import PageTitle from '@/components/PageTitle';
import BoxContent from '@/components/BoxContent';
import MaskDescription from '@/components/MaskDescription';
import AuthorBookCard from './components/AuthorBookCard';
import AuthorInfo from './components/AuthorInfo';
import useAuthorDetail from './hooks/useAuthorDetail';
import Loader from '@/components/Loader';
import useAllBookByAuthor from './hooks/useAllBookByAuthor';
import { Author, Book } from '@/types/types';


const titles = [
    { label: 'Tên tác giả', key: 'name' },
    { label: 'Năm sinh', key: 'dob' },
    { label: 'Quốc tịch', key: 'nationality' },
];


const AuthorDetail = () => {
    const params = useParams();

    const id = params.id as string;
    const { data: author, isLoading, isError } = useAuthorDetail(id);

    const { data: allBooksByAuthor } = useAllBookByAuthor(author?._id);

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        notFound();
    }

    return (
        <div className='author-detail'>
            <PageTitle
                title="Thông tin chi tiết"
                breadcrumbs={[
                    { label: 'Tất cả tác giả', href: '/authors' },
                    { label: author.name, href: `/authors/${author._id}`, isActive: true }
                ]}
            />
            <BoxContent>
                {/* Left: Book Image */}
                <div className="flex flex-col md:flex-row py-8">
                    <div className="flex-shrink-0 md:w-1/4">
                        <div className="w-[80%] mx-auto">
                            <img
                                src={author?.avatar || '/img/default-avatar.png'}
                                alt={author.name}
                                className="w-full h-auto rounded-lg shadow"
                            />
                        </div>

                    </div>
                    <div className="flex-1 md:ml-6 mt-6 md:mt-0">
                        <h2 className="text-lg text-primary font-semibold">{author.name}</h2>
                        <Divider className="custom-divider" />

                        <AuthorInfo titles={titles} content={author} awards={author.awards} />

                        <Divider className="custom-divider" />

                        <MaskDescription
                            className='mt-4 text-sm'
                            content={author.biography}
                        />

                        <Divider className="custom-divider" />

                        <div className='flex items-center justify-between'>
                            <p className='font-semibold text-gray-600'>
                                Cùng tác giả
                            </p>

                        </div>
                        {allBooksByAuthor?.map((book: Book) => (
                            <AuthorBookCard
                                key={book._id}
                                title={book.title}
                                authors={book.authors.map((author: Author) => author.name)}
                                rating={book?.rating || 4}
                                ratingsCount={book.ratingsCount || 1000}
                                publishedYear={new Date(book.publishedDate).getFullYear()}
                                bookImage={book.coverImage || '/img/default-book.png'}
                            />
                        ))}
                    </div>
                </div>
            </BoxContent>
        </div>
    )
}


export default AuthorDetail;