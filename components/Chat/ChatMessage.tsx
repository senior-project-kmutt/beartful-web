import { IChatRoom, IParticipant, IUser } from '@/pages/chat';
import styles from "@/styles/chat/chat.module.scss";
import { socket } from "@/config/socket";
import { useEffect, useRef, useState } from 'react';
import { getMessageByChatRoomId, sendMessage } from '@/services/chat';

interface Props {
  selectedChatRoom?: IChatRoom
  participants?: IParticipant[]
}

export interface IMassage {
  chat_room_id: string;
  sender: string;
  message: string;
  createAt?: Date;
}

const ChatMessage = (props: Props) => {
  const { selectedChatRoom, participants } = props
  const [messages, setMessages] = useState<IMassage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [user, setUser] = useState<IUser>();
  const chatContainerRef = useRef<HTMLDivElement>(null); // Create a ref for the chat container div

  socket.connect();

  socket.on("recieved_message", (newMessage) => {
    setMessages([...messages, newMessage]);
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || ""));
  }, []);

  useEffect(() => {
    if (selectedChatRoom) {
      getMessageByChatRoomId(selectedChatRoom._id).subscribe((res: any) => {
        setMessages(res.data);
      });
    }
  }, [selectedChatRoom]);

  useEffect(() => {
    // Scroll to the bottom of the chat div when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (user && selectedChatRoom) {
      const cleanData: IMassage = {
        chat_room_id: selectedChatRoom?._id,
        sender: user.id,
        message: inputMessage,
      };
      sendMessage(cleanData).subscribe((res: any) => {
        setMessages([...messages, res.data]);
        socket.emit("send-message", res.data, socket.id);
        setInputMessage('')
      });
    }

    return;
  };

  const getImageByUserId = (userId: string) => {
    const user = participants?.find((item) => item.user_id === userId)
    return user?.profile_image
  }

  console.log(inputMessage);

  return (
    <div className={styles.message_main}>
      <div className={styles.message_container}>
        <div className={styles.chat_header}>
          <img src={selectedChatRoom?.participants[0].profile_image} alt="" />
          <p>{selectedChatRoom?.participants[0].username}</p>
        </div>
        <div className={styles.message_wrap} ref={chatContainerRef}>
          {messages.map((item, index) => {
            let isShowProfileImage: boolean = false;
            if (index >= 0) {
              const previousSender = messages[index - 1]?.sender;
              isShowProfileImage = item.sender !== previousSender
            }

            return (
              <>
                <div>
                  <div className={`${item.sender == user?.id ? "flex flex-row-reverse items-start mr-3 mb-2" : "flex justify-start items-start ml-3 mb-2"}`}>
                    {(item.sender !== user?.id) && (
                      <img className={(item.sender !== user?.id && isShowProfileImage) ? 'mr-3' : 'mr-3 invisible'} src={getImageByUserId(item.sender)} alt="" />
                    )}
                    <div
                      className={item.sender == user?.id ?
                        `${styles.message_1} rounded-xl ${isShowProfileImage && `rounded-tr-none`}` :
                        `${styles.message_2} rounded-xl ${isShowProfileImage && `rounded-tl-none`}`}>
                      {item.message}
                    </div>
                  </div>
                </div>
              </>
            )
          })}

        </div>
        <div className={styles.input_field}>
          <input
            type="text"
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>send</button>
        </div>
      </div>
      <div className={styles.profile}>
      </div>
    </div>
  );
}

export default ChatMessage