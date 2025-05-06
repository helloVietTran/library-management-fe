import { useEffect, useRef } from 'react';
import { Avatar, Skeleton } from 'antd';
import MessageInput from './MessageInput';
import Message from './Message';
import { BsThreeDots } from 'react-icons/bs';
import {
  Conversation as ConversationType,
  Message as MessageType,
} from '@/interfaces/commom';
import useAuthStore from '@/store/authStore';

interface MessageContainerProps {
  conversation: ConversationType;
  messages: MessageType[];
  setMessages: React.Dispatch;
  isLoading: boolean;
}

const MessageContainer: React.FC = ({
  conversation,
  messages,
  setMessages,
  isLoading,
}) => {
  const { user: currentUser } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-[450px] flex-col">
      <div className="flex items-center justify-between border-b border-gray-300 p-2">
        <div className="flex gap-2">
          <Avatar
            src={
              false
                ? conversation.participants[0].avatar
                : '/img/default/default-avatar.png'
            }
            size={40}
          />
          <p className="text-primary flex items-center text-base font-semibold">
            {conversation.participants[0].fullName}
          </p>
        </div>

        <button className="flex size-7 cursor-pointer items-center justify-center rounded-sm shadow-sm transition-colors duration-300 hover:bg-gray-200">
          <BsThreeDots className="text-more-icon text-xl" />
        </button>
      </div>
      {/* Message list */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="flex-1 overflow-y-auto p-2">
          {isLoading
            ? [...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-2 p-2">
                  <Skeleton.Avatar active shape="circle" />
                  <div className="flex flex-col gap-2">
                    <Skeleton.Input active style={{ width: 250 }} />
                    <Skeleton.Input active style={{ width: 250 }} />
                  </div>
                </div>
              ))
            : messages.map((msg, idx) => {
                const prevMsg = messages[idx - 1];

                return (
                  <div
                    key={msg._id}
                    ref={idx === messages.length - 1 ? messageEndRef : null}
                  >
                    <Message
                      message={msg}
                      conversation={conversation}
                      previousMessage={prevMsg}
                    />
                  </div>
                );
              })}
        </div>
      </div>
      <MessageInput setMessages={setMessages} conversation={conversation} />
    </div>
  );
};

export default MessageContainer;
