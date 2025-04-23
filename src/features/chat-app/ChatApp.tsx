// ChatApp.tsx
import React, { useEffect, useState, useRef } from "react";
import { Input, Button, Skeleton, message as antMsg } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { BiChat } from "react-icons/bi";

import PageTitle from "@/components/PageTitle";
import { ConversationType, mockConversations, mockUser } from "./types/types";
import Conversation from "./components/Conversation";
import MessageContainer from "./components/MessageContainer";


const ChatApp: React.FC = () => {
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState<ConversationType | null>(null);
  const [searchText, setSearchText] = useState("");
  const [searchingUser, setSearchingUser] = useState(false);

  // Giả lập call API lấy conversations
  useEffect(() => {
    setTimeout(() => {
      setConversations(mockConversations);
      setLoadingConversations(false);
    }, 1000);
  }, []);

  // Xử lý tìm kiếm user
  const handleConversationSearch = () => {
    setSearchingUser(true);
    setTimeout(() => {
      // Giả lập tìm kiếm user (ở đây chỉ tìm trong danh sách mock conversations)
      const found = mockConversations.find((conv) =>
        conv.participants[0].username.toLowerCase().includes(searchText.toLowerCase())
      );
      if (!found) {
        antMsg.error("User không tồn tại");
      } else if (found.participants[0]._id === mockUser._id) {
        antMsg.error("Bạn không thể nhắn tin cho chính mình");
      } else {
        setSelectedConversation(found);
      }
      setSearchingUser(false);
    }, 800);
  };

  return (
    <>
      <PageTitle
        title="Chat App"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: "Chat App", href: '/chat-app', isActive: true }
        ]}
      />
      <div className="w-full p-4 mx-auto">

        <div className="flex flex-col md:flex-row gap-4">
          {/* Sidebar danh sách conversation */}
          <div className="flex flex-col gap-2 md:w-1/3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleConversationSearch();
              }}
              className="flex items-center gap-2"
            >
              <Input
                size="large"
                placeholder="Tìm kiếm người dùng"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{
                  borderRadius: "4px",
                }}
              />
              <Button
                icon={<SearchOutlined />}
                loading={searchingUser}
                onClick={handleConversationSearch}
                size="large"
                style={{
                  borderRadius: "4px",
                  padding: "0 16px"
                }}
              />
            </form>
            <div className="mt-2">
              {loadingConversations
                ? [0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-2 rounded hover:bg-gray-200">
                    <Skeleton.Avatar active size="large" shape="circle" />
                    <div className="flex flex-col gap-1">
                      <Skeleton.Input active style={{ width: 80 }} />
                      <Skeleton.Input active style={{ width: 120 }} />
                    </div>
                  </div>
                ))
                : conversations.map((conv) => (
                  <Conversation
                    key={conv._id}
                    conversation={conv}
                    isOnline={Math.random() < 0.5} // Giả lập trạng thái online
                    selectedConversation={selectedConversation}
                    setSelectedConversation={setSelectedConversation}
                  />
                ))}
            </div>
          </div>
          {/* Chat Box */}
          <div className="flex-1 rounded bg-[#e8eff6] p-2 border  border-blue-200">
            {!selectedConversation ? (
              <div className="flex flex-col items-center justify-center h-[450px] ">
                <BiChat size={100} className="text-primary" />
                <p className="text-xl mt-4">Chọn một người để nhắn tin</p>
              </div>
            ) : (
              <MessageContainer conversation={selectedConversation} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatApp;
