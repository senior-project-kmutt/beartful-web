import { useEffect, useRef, useState } from "react";
import styles from "@/styles/chat.module.scss";
import { getMessageByChatRoomId, sendMessage } from "@/services/chat";
import { socket } from "@/config/socket";

export interface IMassage {
  chat_room_id: number;
  sender: IUser;
  message: string;
  createAt?: Date;
}

interface IUser {
  user_id: number;
  username: string;
  role: string;
}

export default function Home() {
  const [messages, setMessages] = useState<IMassage[]>([]);
  const [user, setUser] = useState<any>();
  const [inputMessage, setInputMessage] = useState<string>("");
  const chatContainerRef = useRef<HTMLDivElement>(null); // Create a ref for the chat container div

  socket.connect();

  socket.on("recieved_message", (newMessage) => {
    setMessages([...messages, newMessage]);
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || ""));
    getMessageByChatRoomId(2).subscribe((res: any) => {
      setMessages(res.data);
    });
  }, []);

  useEffect(() => {
    if (user) {
      socket.emit("add-user", user.id);
    }
  }, [user]);

  useEffect(() => {
    // Scroll to the bottom of the chat div when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    const cleanData: IMassage = {
      chat_room_id: 2,
      sender: {
        user_id: user.id,
        username: user.username,
        role: user.role,
      },
      message: inputMessage,
    };
    sendMessage(cleanData).subscribe((res: any) => {
      setMessages([...messages, res.data]);
      socket.emit("send-message", res.data, socket.id);
      setInputMessage('')
    });
    
    return;
  };

  return (
    <div className={`${styles.container} mx-auto mt-12`}>
      <h1 className="font-bold">{user?.username}</h1>
      <div className={`${styles.wrap_message} overflow-y-auto`} ref={chatContainerRef}>
        {messages?.map((item: IMassage, index) => (
          <div key={index} className={`${item.sender.user_id == user.id ? "flex justify-end mr-3" : "ml-3"}`}>
            <div className={item.sender.user_id == user.id ? `${styles.message_1}` : `${styles.message_2}`}>
              {item.message}
            </div>
          </div>
        ))}
      </div>
      <div>
        <input
          placeholder="Write your message!"
          className={`${styles.input_field}`}
          type="text"
          id="fname"
          name="fname"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button className={`${styles.btn}`} onClick={handleSendMessage}>
          send
        </button>
      </div>
    </div>
  );
}
