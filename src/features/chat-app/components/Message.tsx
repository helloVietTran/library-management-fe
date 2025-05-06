import { Avatar, Skeleton } from 'antd';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';

import { Message as MessageType } from '@/interfaces/commom';
import { Conversation as ConversationType } from '@/interfaces/commom';
import useAuthStore from '@/store/authStore';

interface MessageProps {
  message: MessageType;
  conversation: ConversationType;
  previousMessage?: MessageType;
}

const Message: React.FC = ({ message, conversation, previousMessage }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const { user: currentUser } = useAuthStore();
  const ownMessage = message.sender === currentUser?._id;
  const shouldHideAvatar =
    !ownMessage && previousMessage?.sender === message.sender;

  return (
    <div
      className={`flex ${ownMessage ? 'justify-end' : 'justify-start'} gap-2`}
    >
      {ownMessage ? (
        <>
          <div
            className={`flex flex-col ${!imgLoaded ? 'mt-1 bg-green-700 p-2' : ''} max-w-xs rounded text-white`}
          >
            {message.text && <p className="text-sm">{message.text}</p>}
            {message.img && (
              <div className="mt-2">
                {!imgLoaded && (
                  <Skeleton.Image style={{ width: 200, height: 200 }} />
                )}
                <img
                  src={message.img}
                  alt="Message"
                  className={`${imgLoaded ? 'block' : 'hidden'} h-[160px] rounded object-cover`}
                  onLoad={() => setImgLoaded(true)}
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          {shouldHideAvatar ? (
            <div className="w-[40px]" />
          ) : (
            <Avatar
              src={
                conversation.participants[0].avatar ||
                '/img/default/default-avatar.png'
              }
              size={40}
            />
          )}
          <div className="mt-1 flex max-w-xs flex-col rounded bg-gray-300 p-2 text-black">
            {message.text && (
              <p className="text-sm text-gray-700">{message.text}</p>
            )}
            {message.img && (
              <div className="mt-2">
                {!imgLoaded && (
                  <Skeleton.Image style={{ width: 200, height: 200 }} />
                )}
                <img
                  src={message.img}
                  alt="Message"
                  className={`${imgLoaded ? 'block' : 'hidden'} rounded`}
                  onLoad={() => setImgLoaded(true)}
                />
              </div>
            )}
          </div>
          {message.seen && (
            <div className="ml-1 self-end font-bold text-blue-500">
              <FaCheck size={14} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Message;
