import React from 'react';
import { useParams } from 'next/navigation';

import ReviewCard from './ReviewCard';
import useComments from '../hooks/useComments';
import Loader from '@/components/Loader';
import { Comment } from '@/types/types';

const ReviewList = () => {
    const params = useParams();
    const id = params.id as string;
    const { data: comments, isLoading, isError } = useComments(id);

    if (isLoading) return <Loader />;
    if (isError || !comments) return <span className='text-gray-500 text-lg'>Chưa có bình luận nào!</span>;

    return (
        <div className='mt-4'>

            {comments.map((comment: Comment) => (
                <ReviewCard
                    key={comment._id}
                    avatar={comment.user.avatar || '/img/default-avatar.png'}
                    name={comment.user.fullName}
                    role={comment.user.role.name}
                    createdAt={new Date(comment.createdAt).toLocaleDateString()}
                    content={comment.content}
                    rating={comment.rating}
                    likeCount={comment.likes?.length || 0}
                    userId={comment.user._id}
                />
            ))}
        </div>
    );
};

export default ReviewList;
