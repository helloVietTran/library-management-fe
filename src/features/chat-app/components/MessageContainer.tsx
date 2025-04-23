import { useEffect, useRef, useState } from "react";
import { ConversationType, MessageType, mockMessages, mockUser } from "../types/types";
import { Avatar, Skeleton } from "antd";

import MessageInput from "./MessageInput";
import Message from "./Message";

interface MessageContainerProps {
    conversation: ConversationType;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ conversation }) => {
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const messageEndRef = useRef<HTMLDivElement>(null);

    // Giả lập call API lấy messages
    useEffect(() => {
        setLoadingMessages(true);
        setMessages([]);
        setTimeout(() => {
            // Nếu conversation là mock, không call API
            if (conversation.mock) {
                setMessages([]);
            } else {
                setMessages(mockMessages[conversation._id] || []);
            }
            setLoadingMessages(false);
        }, 1000);
    }, [conversation]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-[450px]">
            {/* Header */}
            <div className="flex items-center gap-2 p-2 border-b border-blue-200">
                <Avatar src={conversation.participants[0].profilePic} />
                <p className="flex items-center text-primary" >
                    {conversation.participants[0].username}
                </p>
            </div>
            {/* Message list */}
            <div className="flex-1 overflow-y-auto p-2 space-y-4">
                {loadingMessages ? (
                    [...Array(5)].map((_, i) => (
                        <div key={i} className="flex gap-2 p-2">
                            <Skeleton.Avatar active shape="circle" />
                            <div className="flex flex-col gap-2">
                                <Skeleton.Input active style={{ width: 250 }} />
                                <Skeleton.Input active style={{ width: 250 }} />
                            </div>
                        </div>
                    ))
                ) : (
                    messages.map((msg, idx) => (
                        <div key={msg._id} ref={idx === messages.length - 1 ? messageEndRef : null}>
                            <Message message={msg} ownMessage={msg.sender === mockUser._id} />
                        </div>
                    ))
                )}
            </div>
            <MessageInput setMessages={setMessages} conversation={conversation} />
        </div>
    );
};

export default MessageContainer;