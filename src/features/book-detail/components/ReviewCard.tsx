import React from "react";
import Link from "next/link";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaBan } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { Avatar, Divider, Dropdown, MenuProps, Rate } from "antd";
import { GoStarFill } from "react-icons/go";

import MaskDescription from "@/components/MaskDescription";
import "../styles/ReviewCard.scss"

interface ReviewCardProps {
    avatar: string;
    name: string;
    role: string;
    likeCount: number;
    createdAt: string;
    content: string;
    rating: number;
    userId: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
    avatar,
    name,
    likeCount,
    createdAt,
    content,
    role,
    rating,
    userId
}) => {

    const handleLike = async () => {

    }
    const handleDeleteComment = async () => {

    }

    const dropdownItems: MenuProps["items"] = [
        {
            label: (
                <div
                    className="flex items-center cursor-pointer x-[10px] py-[4px] hover:text-blue-600"
                    onClick={() => handleLike()}
                >
                    <AiOutlineLike className="mr-2" size={18} />
                    Thích bình luận
                </div>
            ),
            key: "Like Comment",
        },
        {
            label: (
                <div className="flex items-center cursor-pointer px-[10px] py-[4px] hover:text-red-600">
                    <FaBan className="mr-2" />
                    Xóa bình luận
                </div>
            ),
            key: "Delete comment",
        },
    ];
    return (
        <>
            <div className="review-card flex gap-4 p-4">
                <div className="flex-shrink-0">
                    <Link href={`/users/${userId}`}>
                        <Avatar src={avatar} alt={userId} size={50} />
                    </Link>
                </div>

                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="font-semibold text-primary">
                                <Link
                                    href={`/users/${userId}`}
                                >
                                    {name}
                                </Link>

                            </h3>
                            <p className="text-sm text-gray-500 text-sm" >
                                {role}
                                <span className="px-2">•</span>
                                <span>{likeCount} lượt thích</span>
                            </p>
                        </div>

                    </div>
                    {/* Post */}
                    <div className="mt-2 mb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Rate
                                    disabled
                                    defaultValue={rating}
                                    allowHalf
                                    character={<GoStarFill size={16} />}
                                    className="star-icon"
                                />
                                <span className="text-lg font-medium text-sm">{rating}</span>
                            </div>
                            <p className="text-xs text-gray-500">{createdAt}</p>
                        </div>

                    </div>
                    <MaskDescription
                        className="text-base text-lg"
                        content={content}
                    />
                   
                    <div className="mt-2 flex justify-end">
                        <Dropdown menu={{ items: dropdownItems }} trigger={["click"]} placement="bottom">
                            <IoIosMore className="cursor-pointer" />
                        </Dropdown>
                    </div>
                </div>

            </div>

            <Divider className="custom-divider" />
        </>
    );
};

export default ReviewCard;
