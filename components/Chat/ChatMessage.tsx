import { IChatRoom, IParticipant, IUser } from '@/pages/chat';
import styles from "@/styles/chat/chat.module.scss";
import { socket } from "@/config/socket";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { getMessageByChatRoomId, sendMessage } from '@/services/chat/chat.api';
import MessageItem from './MessageItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/config/firebase.config';
import ChatProfile from './ChatProfile';
import { faFile } from '@fortawesome/free-regular-svg-icons';

interface Props {
  selectedChatRoom?: IChatRoom
  participants?: IParticipant[]
}

export interface IMassage {
  chat_room_id: string;
  sender: string;
  message: string;
  createdAt?: Date;
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
  const [user, setUser] = useState<IUser>();
  const [interlocutor, setInterlocutor] = useState<IParticipant>();
  const chatContainerRef = useRef<HTMLDivElement>(null); // Create a ref for the chat container div

  initializeApp(firebaseConfig);
  socket.connect();

  socket.on("recieved_message", (newMessage) => {
    if (newMessage.chat_room_id === selectedChatRoom?._id) {
      setMessages([...messages, newMessage]);
    }
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
    const filterProfile = participants?.filter((item) => {
      return item.user_id !== user?.id
    })
    if (filterProfile) {
      setInterlocutor(filterProfile[0])
    }
  }, [selectedChatRoom]);

  useEffect(() => {
    // Scroll to the bottom of the chat div when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, selectedChatRoom]);

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

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  }

  const submitSend = (message: string) => {
    if (user && selectedChatRoom) {
      const cleanData: IMassage = {
        chat_room_id: selectedChatRoom?._id,
        sender: user.id,
        message: message,
      };
      sendMessage(cleanData).subscribe((res: any) => {
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

  const compareDateEqual = (date1: Date, date2: Date) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  const getDate = (dateTime?: Date) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    if (dateTime) {
      const convertToDate = new Date(dateTime)
      const date = String(convertToDate.getDate()).padStart(2, '0');
      const monthIndex = convertToDate.getMonth();
      const year = String(convertToDate.getFullYear())
      return `${date} ${months[monthIndex]} ${year}`
    }
  }

  const deleteFileInput = (fileIndex: number) => {
    setInputFiles((prevInputFiles) => {
      const updatedInputFiles = [...prevInputFiles.slice(0, fileIndex), ...prevInputFiles.slice(fileIndex + 1)];
      return updatedInputFiles;
    });
  };

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
            let isShowDate: boolean = true;
            if (index >= 0) {
              const previousMessage = messages[index - 1];
              isShowProfileImage = item.sender !== previousMessage?.sender;
              if (item.createdAt && previousMessage?.createdAt) {
                isShowDate = !compareDateEqual(item?.createdAt, previousMessage.createdAt);
              }
            }

            return (
              <>
                {isShowDate && (
                  <div className={styles.date}>
                    <span>{getDate(item.createdAt)}</span>
                  </div>
                )}
                <MessageItem
                  item={item}
                  isShowProfileImage={isShowProfileImage}
                  profileImage={profileImage}
                />
              </>
            )
          })}
        </div>
        {inputFiles.length !== 0 && (
          <div className={styles.preview}>
          {inputFiles.map((item, index) => {
            return (
              <>
                <div className={`${styles.preview_item}`}>
                  <div className={styles.file_name}>
                    <FontAwesomeIcon icon={faFile} size='xl' />
                    <p className='border-none'>{item.name}</p>
                  </div>
                  <FontAwesomeIcon onClick={() => deleteFileInput(index)} className={styles.close} icon={faCircleXmark} size='lg' />
                </div>
              </>
            )
          })}
        </div>
        )}
        <div className={styles.input_warp}>
          <div className={styles.input_box}>
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
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className={styles.send}>
            <FontAwesomeIcon onClick={handleSendMessage} className='cursor-pointer' icon={faPaperPlane} size='lg' />
          </div>
        </div>
      </div>
      <div className={styles.profile}>
        {interlocutor && (
          <ChatProfile profile={interlocutor} />
        )}
      </div>
    </div>
  );
}

export default ChatMessage