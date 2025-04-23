import { Avatar, Skeleton } from "antd";
import { MessageType, mockConversations, mockUser, User } from "../types/types";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

// Giả lập hàm để lấy thông tin người gửi (với user khác)
const conversationUser = (message: MessageType): User => {
  // Ở đây giả sử nếu sender không phải current user thì nó thuộc về conversation người nhận
  // Trong thực tế bạn sẽ lấy từ conversation đã chọn
  return mockConversations[0].participants[0];
};
interface MessageProps {
  message: MessageType;
  ownMessage: boolean;
}

const Message: React.FC<MessageProps> = ({ message, ownMessage }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <div className={`flex ${ownMessage ? "justify-end" : "justify-start"} gap-2`}>
      {ownMessage ? (
        <>
          <div className="flex flex-col bg-green-700 text-white p-2 rounded max-w-xs">
            {message.text && <p className="text-sm">{message.text}</p>}
            {message.img && (
              <div className="mt-2">
                {!imgLoaded && <Skeleton.Image style={{ width: 200, height: 200 }} />}
                <img
                  src={message.img}
                  alt="Message"
                  className={`${imgLoaded ? "block" : "hidden"} rounded h-[160px] object-cover`}
                  onLoad={() => setImgLoaded(true)}
                
                />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Avatar src={conversationUser(message).profilePic}  />
          <div className="flex flex-col bg-gray-300 text-black p-2 rounded max-w-xs">
            {message.text && <p className="text-sm text-gray-700">{message.text}</p>}
            {message.img && (
              <div className="mt-2">
                {!imgLoaded && <Skeleton.Image style={{ width: 200, height: 200 }} />}
                <img
                  src={message.img}
                  alt="Message"
                  className={`${imgLoaded ? "block" : "hidden"} rounded`}
                  onLoad={() => setImgLoaded(true)}
                />
              </div>
            )}
          </div>
          <div className="self-end ml-1 text-blue-500 font-bold">
            <FaCheck size={14} />
          </div>
        </>
      )}
    </div>
  );
};

export default Message;