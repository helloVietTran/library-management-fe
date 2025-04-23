import { Button, Input, Modal, message as antMsg } from "antd";
import { useRef, useState } from "react";
import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import { IoIosSend } from "react-icons/io";
import { SlPicture } from "react-icons/sl";


import { ConversationType, MessageType, mockUser } from "../types/types";


interface MessageInputProps {
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
    conversation: ConversationType;
}

const MessageInput: React.FC<MessageInputProps> = ({ setMessages, conversation }) => {
    const [messageText, setMessageText] = useState("");
    const [imgUrl, setImgUrl] = useState<string>("");
    const [isSending, setIsSending] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleSendMessage = () => {
        if (!messageText && !imgUrl) return;
        if (isSending) return;
        setIsSending(true);
        // Giả lập gửi message
        setTimeout(() => {
            const newMessage: MessageType = {
                _id: Date.now().toString(),
                text: messageText,
                img: imgUrl,
                sender: mockUser._id,
                seen: false,
            };
            setMessages((prev) => [...prev, newMessage]);
            setMessageText("");
            setImgUrl("");
            setIsSending(false);
            antMsg.success("Message sent");
            setPreviewVisible(false);
        }, 800);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setImgUrl(url);
            setPreviewVisible(true);
        }
    };

    return (
        <div className="flex items-center gap-2 p-2 border-t border-blue-200">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                }}
                className="flex-1"
            >
                <Input
                    placeholder="Nhập tin nhắn"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    suffix={<IoIosSend 
                        onClick={handleSendMessage}
                        className="cursor-pointer text-primary"
                        size={22}
                    />}
                    size="large"
                    style={{ borderRadius: "20px" }}
                    className="shadow-xs"
                />
            </form>

            <div className="cursor-pointer" onClick={() => imageInputRef.current?.click()}>
                <SlPicture className="text-gray-500 hover:text-gray-700" size={20}/>
                <input type="file" hidden ref={imageInputRef} onChange={handleImageChange} />
            </div>

            <Modal open={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
                {imgUrl && <img src={imgUrl} alt="Preview" className="w-full" />}
                <div className="flex justify-end mt-2">
                    <Button type="primary" onClick={handleSendMessage} loading={isSending} icon={<SendOutlined />}>
                        Gửi
                    </Button>
                </div>
            </Modal>
        </div>
    );
};


export default MessageInput;