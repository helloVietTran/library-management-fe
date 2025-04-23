import { useState } from "react";
import { Rate, message } from "antd";
import { GoSortAsc, GoSortDesc } from "react-icons/go";
import { IoMdSend } from "react-icons/io";

import "../styles/ReviewActions.scss";

const ReviewActions = () => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState<number>(0);
    const [isAscending, setIsAscending] = useState<boolean>(true);

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    const handlePostComment = async () => {
        if (!comment.trim()) {
            message.warning("Vui lòng nhập bình luận!");
            return;
        }

        if (rating === 0) {
            message.warning("Vui lòng chọn số sao!");
            return;
        }

        console.log("Posting review:", { comment, rating });

        setComment("");
        setRating(0);
        message.success("Bình luận đã được gửi!");
    };

    const toggleSortOrder = () => {
        setIsAscending(!isAscending);

        // Cập nhật giá trị sortBy
        const sortBy = isAscending ? -1 : 1;

        // Lấy URL hiện tại
        const currentUrl = window.location.href;

        // Tạo một URL mới với query string mới (sortBy)
        const newUrl = new URL(currentUrl);
        newUrl.searchParams.set("sortBy", sortBy.toString());

        // Cập nhật URL mà không làm mới trang
        window.history.pushState({ path: newUrl.href }, "", newUrl.href);
        
        console.log("Sort order updated:", sortBy);
    };

    return (
        <div className="review-actions mt-6">
            <div className="flex flex-col gap-3">
                {/* Star Rating */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-700 text-sm font-medium">Đánh giá:</span>
                    <Rate value={rating} onChange={setRating} />
                </div>

                <div className="flex items-center gap-4">
                    <div className="comment-input-wrapper flex items-center bg-gray-100 px-3 py-2 w-[500px]">
                        <input
                            type="text"
                            placeholder="Nhập bình luận..."
                            value={comment}
                            onChange={handleCommentChange}
                            className="ml-2 bg-transparent focus:outline-none flex-1"
                        />
                        <IoMdSend
                            className="cursor-pointer size-5 text-gray-500 hover:text-gray-700"
                            onClick={handlePostComment}
                        />
                    </div>

                    <button
                        className="sort-btn cursor-pointer"
                        onClick={toggleSortOrder}
                    >
                        {isAscending ? (
                            <GoSortAsc className="text-gray-600 size-6" />
                        ) : (
                            <GoSortDesc className="text-gray-600 size-6" />
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ReviewActions;
