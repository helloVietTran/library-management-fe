import { Avatar } from "antd";
import { ConversationType, MessageType, mockConversations, mockUser, User } from "../types/types";
import { FaCheck, FaCheckDouble } from "react-icons/fa6";
import { PictureOutlined } from "@ant-design/icons";

interface ConversationProps {
    conversation: ConversationType;
    isOnline: boolean;
    selectedConversation: ConversationType | null;
    setSelectedConversation: React.Dispatch<React.SetStateAction<ConversationType | null>>;
}

const Conversation: React.FC<ConversationProps> = ({ conversation, isOnline, selectedConversation, setSelectedConversation }) => {
    const user = conversation.participants[0];
    const { lastMessage } = conversation;

    return (
        <div
            onClick={() => setSelectedConversation(conversation)}
            className={`
                flex items-center gap-4 p-2 rounded cursor-pointer hover:bg-gray-200 
                ${selectedConversation?._id === conversation._id ? "bg-gray-200" : ""
                }`}
        >
            <Avatar src={user.profilePic} size="large" />
            <div className="flex flex-col">
                <p className="font-semibold text-gray-700 text-sm flex items-center gap-2">
                    {user.username}
                    {isOnline && <div className="size-2 bg-green-500 rounded-full"></div>}
                </p>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                    {lastMessage.sender === mockUser._id && (
                        <span className={`${lastMessage.seen ? "text-blue-700" : ""}`}>
                            <FaCheck size={14} />
                        </span>
                    )}
                    {lastMessage.text.length > 18 ? lastMessage.text.substring(0, 18) + "..." : lastMessage.text || <PictureOutlined />}
                </p>
            </div>
        </div>
    );
};

export default Conversation;