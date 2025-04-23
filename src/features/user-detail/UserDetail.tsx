import React from 'react'
import UserHeader from './components/UserHeader'
import ReviewCard from '../book-detail/components/ReviewCard'
import PageTitle from '@/components/PageTitle';
import BoxContent from '@/components/BoxContent';
import { Divider } from 'antd';
import { notFound, useParams } from 'next/navigation';
import useUserDetail from './hooks/useAuthorDetail';
import Loader from '@/components/Loader';

const UserDetail = () => {
    const reviewData = {
        avatar: 'https://placehold.co/50x50', // URL avatar của người dùng
        name: 'Tên sách',
        role: 'Người dùng',
        booksCount: 10,
        followersCount: 100,
        postDate: '2024-10-27',
        postTitle: 'Đánh giá sách',
        postContent: 'Cuốn sách này rất hay. Nội dung hấp dẫn, nhân vật được xây dựng tốt...',
        likes: 50,
        comments: 20,

    };

    const params = useParams();
    const id = params.id as string;

    const { data: user, isLoading, isError } = useUserDetail(id);

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        notFound();
    }

    return (
        <div>
            <PageTitle
                title="Thông tin chi tiết"
                breadcrumbs={[
                    { label: 'DS người dùng', href: '/users' },
                    { label: user.fullName, href: `/users/${user._id}`, isActive: true }
                ]}
            />
            <Divider />
            <UserHeader
                data={user}
            />
            <div className='flex flex-col gap-2'>
                <span className='text-sm text-gray-600'>Người dùng chưa bình luận!</span>
                <BoxContent>
                    <ReviewCard
                        avatar={reviewData.avatar}
                        name={reviewData.name}
                        role={reviewData.role}
                        booksCount={reviewData.booksCount}
                        followersCount={reviewData.followersCount}
                        postDate={reviewData.postDate}
                        postTitle={reviewData.postTitle}
                        postContent={reviewData.postContent}
                        likes={reviewData.likes}
                        comments={reviewData.comments}
                    />

                </BoxContent>
                <BoxContent>
                    <ReviewCard
                        avatar={reviewData.avatar}
                        name={reviewData.name}
                        role={reviewData.role}
                        booksCount={reviewData.booksCount}
                        followersCount={reviewData.followersCount}
                        postDate={reviewData.postDate}
                        postTitle={reviewData.postTitle}
                        postContent={reviewData.postContent}
                        likes={reviewData.likes}
                        comments={reviewData.comments}
                    />

                </BoxContent>
            </div>

        </div>
    )
}

export default UserDetail