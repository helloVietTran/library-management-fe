import React from "react";
import { Divider, Rate } from "antd";
import { GoStarFill } from "react-icons/go";
import { useParams } from "next/navigation";

import RatingBreakdown from "./RatingBreakdown";
import ReviewActions from "./ReviewActions";
import useStatsRating from "../hooks/useStatsRating";
import Loader from "@/components/Loader";
import "../styles/CommunityReviews.scss";

const CommunityReviews = () => {
    const params = useParams();
    const bookId = params.id as string;

    const { data, isLoading, isError } = useStatsRating(bookId);
    if (isLoading) return <Loader />;
    if (isError || !data) return <div>Chưa có đánh giá nào</div>;

    const { totalComments, averageRating, ratingsBreakdown } = data;

    return (
        <div className="community-reviews">
            <Divider className="custom-divider" />
            <p className='text-xl font-semibold mb-2 text-gray-600 mb-4'>
                Đánh giá từ người dùng thư viện
            </p>

            <div className="flex items-center mb-6">
                <div className="flex items-center gap-2">
                    <Rate
                        disabled
                        defaultValue={averageRating}
                        allowHalf
                        character={<GoStarFill />}
                        className="star-icon"
                    />
                    <span className="text-lg font-semibold">{averageRating || 0}</span>
                </div>
                <div className="text-gray-500 ml-12 text-sm">
                    {totalComments.toLocaleString()} lượt đánh giá
                </div>
            </div>

            <RatingBreakdown ratingsBreakdown={ratingsBreakdown} totalComments={totalComments} />
            <ReviewActions />
        </div>
    );
};

export default CommunityReviews;
