import { Avatar } from 'antd';
import { FaCheck } from 'react-icons/fa6';
import { Conversation as ConversationType } from '@/interfaces/commom';
import useAuthStore from '@/store/authStore';

interface ConversationProps {
  conversation: ConversationType;
  isOnline: boolean;
  selectedConversation: ConversationType | null;
  setSelectedConversation: React.Dispatch;
}

const Conversation: React.FC = ({
  conversation,
  isOnline,
  selectedConversation,
  setSelectedConversation,
}) => {
  const otherUser = conversation.participants[0];
  const { lastMessage } = conversation;
  const { user: currentUser } = useAuthStore();

  console.log(lastMessage);
  return (
    <div
      onClick={() => setSelectedConversation(conversation)}
      className={`bg-coversation-bg hover:bg-conversation-bg-hover relative flex cursor-pointer items-center gap-4 rounded-xl p-2 transition-colors duration-300 ${selectedConversation?._id === conversation._id ? '!bg-conversation-bg-hover' : ''} `}
    >
      <Avatar src={'/img/default/default-avatar.png'} size={44} />

      <div className="flex flex-col">
        <span className="text-primary flex items-center gap-2 font-bold">
          {otherUser?.fullName}
        </span>
        <p className="flex items-center justify-between text-xs font-medium text-gray-500">
          {lastMessage?.text
            ? lastMessage.text.length > 18
              ? lastMessage.text.substring(0, 18) + '...'
              : lastMessage.text
            : 'Chưa có tin nhắn nào!'}

          {lastMessage?.sender !== currentUser?._id && lastMessage?.seen && (
            <span className="text-blue-700">
              <FaCheck size={14} />
            </span>
          )}
        </p>
      </div>

      <div
        className={`size-3 ${isOnline ? 'bg-green-400' : 'bg-red-500'} absolute top-2 right-2 rounded-full`}
      ></div>
    </div>
  );
};

export default Conversation;
