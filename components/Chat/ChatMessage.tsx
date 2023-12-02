import { IChatRoom, IParticipant, IUser } from '@/pages/chat';
import styles from "@/styles/chat/chat.module.scss";
import { socket } from "@/config/socket";
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { getMessageByChatRoomId, sendMessage } from '@/services/chat';
import MessageItem from './MessageItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/config/firebase.config';

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

export interface IFileUpload {
  name: string;
  lastModified: number;
  size: number;
  type: string;
  webkitRelativePath: string
}

const ChatMessage = (props: Props) => {
  const { selectedChatRoom, participants } = props
  const [messages, setMessages] = useState<IMassage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [inputFiles, setInputFiles] = useState<File[]>([]);
  const [successMessage, setSuccessMessage] = useState<IMassage>();
  const [user, setUser] = useState<IUser>();
  const chatContainerRef = useRef<HTMLDivElement>(null); // Create a ref for the chat container div

  initializeApp(firebaseConfig);
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
  }, [messages, inputFiles]);

  useEffect(() => {
    if (successMessage) {
      setMessages([...messages, successMessage])
    }
  }, [successMessage]);


  const handleSendMessage = () => {
    if (selectedChatRoom) {
      if (inputFiles) {
        const storage = getStorage();
        inputFiles.map(async (file) => {
          const storageRef = ref(storage, `chat/${selectedChatRoom._id}/${file.name}`);
          const snapshot = await uploadBytesResumable(storageRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);
          submitSend(downloadURL)
        })
      }
      if (inputMessage) {
        submitSend(inputMessage);
      }
      setInputFiles([])
      setInputMessage('')
    }
    return;
  };

  const submitSend = (message: string) => {
    if (user && selectedChatRoom) {
      const cleanData: IMassage = {
        chat_room_id: selectedChatRoom?._id,
        sender: user.id,
        message: message,
      };
      sendMessage(cleanData).subscribe((res: any) => {
        setSuccessMessage(res.data)
        socket.emit("send-message", res.data, socket.id);
      });
    }
  }

  const getImageByUserId = (userId: string) => {
    const user = participants?.find((item) => item.user_id === userId)
    return user?.profile_image
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setInputFiles([
        ...event.target.files
      ]);
    }
  }

  return (
    <div className={styles.message_main}>
      <div className={styles.message_container}>
        <div className={styles.chat_header}>
          <img src={selectedChatRoom?.participants[0].profile_image} alt="" />
          <p>{selectedChatRoom?.participants[0].username}</p>
        </div>
        <div className={styles.message_wrap} ref={chatContainerRef}>
          {messages.map((item, index) => {
            const profileImage = getImageByUserId(item.sender)
            let isShowProfileImage: boolean = false;
            if (index >= 0) {
              const previousSender = messages[index - 1]?.sender;
              isShowProfileImage = item.sender !== previousSender
            }
            return (
              <>
                <MessageItem
                  item={item}
                  isShowProfileImage={isShowProfileImage}
                  profileImage={profileImage}
                />
              </>
            )
          })}
          <div className={styles.preview}>
            {inputFiles.map((item) => {
              return (
                <>
                  <p>{item.name}</p>
                </>
              )
            })}

          </div>
        </div>
        <div className={styles.input_warp}>
          <div className={styles.input_field}>
            <div className={styles.input_file}>
              <label htmlFor="file-input">
                <FontAwesomeIcon className={styles.icon} icon={faPaperclip} size='lg' />
              </label>
              <input id="file-input" type="file" onChange={handleFileChange} multiple />
            </div>
            <input
              type="text"
              placeholder='Type Something ...'
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
          </div>
          <div className={styles.send}>
            <FontAwesomeIcon onClick={handleSendMessage} className='cursor-pointer' icon={faPaperPlane} size='lg' />
          </div>
        </div>
      </div>
      <div className={styles.profile}>
      </div>
    </div>
  );
}

export default ChatMessage