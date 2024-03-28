import { IChatRoom, IParticipant, IUser } from '@/pages/chat';
import styles from "@/styles/chat/chat.module.scss";
import { socketMessage } from "@/config/socket";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { getMessageByChatRoomId, sendMessage } from '@/services/chat/chat.api';
import MessageItem from './MessageItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faCircleXmark, faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/config/firebase.config';
import ChatProfile from './ChatProfile';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { Dropdown } from 'flowbite-react';
import QuotationModal from '../Profile/Freelance/QuotationModal';
import ReceiptModal from '../Profile/Freelance/ReceiptModal';

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
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState<boolean>(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState<boolean>(false);

  initializeApp(firebaseConfig);
  socketMessage.connect();

  socketMessage.on("recieved_message", (newMessage) => {
    if (newMessage.chat_room_id === selectedChatRoom?._id) {
      setMessages([...messages, newMessage]);
    }
  });

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || ""));
  }, []);

  useEffect(() => {
    if (selectedChatRoom) {
      const token = localStorage.getItem("auth");
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`
        };
        getMessageByChatRoomId(selectedChatRoom._id, headers).then((res: any) => {
          setMessages(res);
        });
      }
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
      const token = localStorage.getItem("auth");
      if (token) {
        const headers = {
          Authorization: `Bearer ${token}`
        };
        sendMessage(cleanData, headers).then((res: any) => {
          socketMessage.emit("send-message", res, socketMessage.id);
        });
      }
    }
  }

  const getImageByUserId = (userId: string) => {
    const user = participants?.find((item) => item.user_id === userId)
    return user?.profileImage
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
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤษจิกายน", "ธันวาคม"
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

  const openQuotationModal = () => {
    setIsQuotationModalOpen(!isQuotationModalOpen)
  }

  const openReceiptModal = () => {
    setIsReceiptModalOpen(!isReceiptModalOpen)
  }

  return (
    <div className={styles.message_main}>
      <div className={styles.message_container}>
        <div className={styles.chat_header}>
          <img src={selectedChatRoom?.participants[0].profileImage} alt="" />
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

        {isQuotationModalOpen &&
          <>
            {(selectedChatRoom?.participants[0].username && user?.username) && (
              <QuotationModal
                openQuotationModal={openQuotationModal}
                sendMessage={submitSend}
                customerUsername={selectedChatRoom?.participants[0].username}
                freelanceId={user?.id}
              />
            )}
          </>
        }

        {isReceiptModalOpen &&
          <>
            {(selectedChatRoom?.participants[0].username && user?.username) && (
              <ReceiptModal
                openReceiptModal={openReceiptModal}
                sendMessage={submitSend}
                customerUsername={selectedChatRoom?.participants[0].username}
                freelanceId={user?.id}
              />
            )}
          </>
        }

        <div className={styles.input_warp}>
          <div className={styles.input_box}>
            {user?.role === 'freelance' && (
              <Dropdown
                arrowIcon={false}
                inline
                label={<FontAwesomeIcon className={styles.icon} icon={faCirclePlus} size='lg' />}
              >
                <Dropdown.Item onClick={openQuotationModal}>สร้างใบเสนอราคา</Dropdown.Item>
                {/* <Dropdown.Divider /> */}
                {/* <Dropdown.Item onClick={openReceiptModal}>สร้างใบเสร็จ</Dropdown.Item> */}
              </Dropdown>
            )}
            <div className={styles.input_file}>
              <label htmlFor="file-input">
                <FontAwesomeIcon className={styles.icon} icon={faPaperclip} size='lg' />
              </label>
              <input id="file-input" type="file" onChange={handleFileChange} multiple />
            </div>
            <input
              type="text"
              placeholder='พิมพ์ข้อความ ...'
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