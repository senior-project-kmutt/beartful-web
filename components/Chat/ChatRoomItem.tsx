import { BUGKET_STORAGE } from '@/config/constants';
import { IChatRoom } from '@/pages/chat';
import { getLatestMessageByChatRoomId } from '@/services/chat/chat.api';
import styles from "@/styles/chat/chat.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { socketMessage } from "@/config/socket";
import { useRouter } from 'next/router';

interface Props {
  chatRoomItem: IChatRoom
  selectedChatRoom?: IChatRoom
  setChatRoomId: Dispatch<SetStateAction<string | undefined>>
}

const ChatRoomItem = (props: Props) => {
  const { chatRoomItem, selectedChatRoom, setChatRoomId } = props
  const [latestMessage, setLatestMessage] = useState<string>("")
  const [isFileMessage, setIsFileMessage] = useState<boolean>(false)
  const router = useRouter();
  socketMessage.connect();

  socketMessage.on("recieved_message", (newMessage) => {
    if (newMessage.chat_room_id === chatRoomItem._id) {
      getLatestMessage();
    }
  });

  useEffect(() => {
    getLatestMessage();
  }, [])

  const getLatestMessage = () => {
    const token = localStorage.getItem("auth");
    if (token) {
      const headers = {
        Authorization: `Bearer ${token}`
      };
      getLatestMessageByChatRoomId(chatRoomItem._id, headers).then(res => {
        const isFileMessage = res.message?.includes(BUGKET_STORAGE);
        setIsFileMessage(isFileMessage)
        if (isFileMessage) {
          setLatestMessage("ไฟล์แนบ");
        } else {
          setLatestMessage(res.message)
        }
      })
    }
  }

  const handleClickChatRoom = () => {
    setChatRoomId(chatRoomItem._id)
    router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/chat?chatRoom=${chatRoomItem._id}`);
  }
  return (
    <div
      onClick={handleClickChatRoom}
      className={`${styles.chat_room_main} ${chatRoomItem._id === selectedChatRoom?._id && `${styles.active}`}`}
    >
      <div className={styles.image}>
        <img src={chatRoomItem.participants[0].profileImage} alt="" />
      </div>
      <div className={`${styles.text} ml-5`}>
        <h1 className='font-extrabold'>{chatRoomItem.participants[0].username}</h1>
        <p className={styles.latest_message}>
          {isFileMessage && (
            <FontAwesomeIcon className='mr-1' icon={faPaperclip} size='sm' />
          )}
          {latestMessage}
        </p>
      </div>
    </div>
  );
}

export default ChatRoomItem