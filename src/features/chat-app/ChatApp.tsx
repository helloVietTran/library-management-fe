import React, { useEffect, useRef, useState } from 'react';
import { Button, Skeleton } from 'antd';
import { BiChat } from 'react-icons/bi';
import { Socket } from 'socket.io-client';

import PageTitle from '@/components/PageTitle';
import Conversation from './components/Conversation';
import MessageContainer from './components/MessageContainer';
import { FiPlus } from 'react-icons/fi';
import { getSocket } from '@/config/socket';
import { getTokenFromSession } from '@/utils/auth';
import {
  Conversation as ConversationType,
  Message as MessageType,
} from '@/interfaces/commom';
import useFetchMessages from './hooks/useFetchMessages';
import useFetchConversations from './hooks/useFetchConversations';
import NewConversationModal from './components/NewConversationModal';

const ChatApp = () => {
  const socketRef = useRef<Socket | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  const { data: conversationData, isLoading } = useFetchConversations();
  const { data: messagesData, isLoading: isLoadingMessages } = useFetchMessages(
    selectedConversation?.participants[0]._id || null
  );

  const [isModalOpen, setIsModalOpen] = useState(false); // modal state

  useEffect(() => {
    if (conversationData?.data) {
      setConversations(conversationData.data);
    }
  }, [conversationData]);

  useEffect(() => {
    if (messagesData?.data) {
      setMessages(messagesData.data);
    }
  }, [messagesData]); // quản lý real time

  useEffect(() => {
    const sessionToken = getTokenFromSession();
    if (sessionToken) {
      setToken(sessionToken);
    }
  }, []); // get token

  useEffect(() => {
    if (!token) return;

    if (!socketRef.current) {
      socketRef.current = getSocket(token);
    }
    const socketInstance = socketRef.current;

    socketInstance.on('onlineUsers', (users: string[]) => {
      setOnlineUsers(users);
    });

    socketInstance.on('newMessage', (newMessage: MessageType) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socketInstance.on(
      'messagesSeen',
      (updatedConversation: ConversationType) => {
        setMessages((prevMessages) =>
          prevMessages.map((message) => ({ ...message, seen: true }))
        );

        setSelectedConversation((prev) => {
          if (!prev || prev._id !== updatedConversation._id) return prev;
          return {
            ...prev,
            lastMessage: {
              ...prev.lastMessage,
              seen: true,
            },
          };
        });
      }
    );

    return () => {
      socketInstance.disconnect();
    };
  }, [token]); //real time

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <PageTitle
        title="Chat App"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Chat App', href: '/chat-app', isActive: true },
        ]}
      />
      <div className="mx-auto w-full p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Sidebar conversation */}
          <div className="flex flex-col gap-2 md:w-1/3">
            <Button
              type="primary"
              icon={<FiPlus />}
              onClick={handleOpenModal}
            />
            <div className="mt-2">
              {isLoading ? (
                [0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded p-2 hover:bg-gray-200"
                  >
                    <Skeleton.Avatar active size="large" shape="circle" />
                    <div className="flex flex-col gap-1">
                      <Skeleton.Input active style={{ width: 80 }} />
                      <Skeleton.Input active style={{ width: 120 }} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col gap-2">
                  {conversations.length > 0 &&
                    conversations.map((conv) => {
                      const user = conv.participants[0];
                      const isOnline = user?._id
                        ? onlineUsers.includes(user._id)
                        : false;

                      return (
                        <Conversation
                          key={conv._id}
                          conversation={conv}
                          isOnline={isOnline}
                          selectedConversation={selectedConversation}
                          setSelectedConversation={setSelectedConversation}
                        />
                      );
                    })}
                </div>
              )}
            </div>
          </div>

          {/* Chat Box */}
          <div className="bg-message-container-bg border-message-container-border flex-1 rounded-lg border p-2 shadow-md">
            {!selectedConversation || !messages ? (
              <div className="flex h-[450px] flex-col items-center justify-center">
                <BiChat size={100} className="text-primary" />
                <p className="text-primary mt-4 text-xl font-medium">
                  Chọn một người để nhắn tin
                </p>
              </div>
            ) : (
              <MessageContainer
                conversation={selectedConversation}
                messages={messages}
                setMessages={setMessages}
                isLoading={isLoadingMessages}
              />
            )}
          </div>
        </div>
      </div>

      <NewConversationModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default ChatApp;
