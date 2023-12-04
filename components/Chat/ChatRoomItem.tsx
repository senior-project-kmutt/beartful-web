import { BUGKET_STORAGE } from '@/config/constants';
import { IChatRoom } from '@/pages/chat';
import { getLatestMessageByChatRoomId } from '@/services/chat/chat.api';
import styles from "@/styles/chat/chat.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faPaperclip } from '@fortawesome/free-solid-svg-icons';

interface Props {
  chatRoomItem: IChatRoom
  selectedChatRoom?: IChatRoom
  setSelectedChatRoom: Dispatch<SetStateAction<IChatRoom | undefined>>
}

const ChatRoomItem = (props: Props) => {
  const { chatRoomItem, selectedChatRoom, setSelectedChatRoom } = props
  const [latestMessage, setLatestMessage] = useState<string>("ddd")
  const [isFileMessage, setIsFileMessage] = useState<boolean>(false)

  useEffect(() => {
    getLatestMessageByChatRoomId(chatRoomItem._id).subscribe(res => {
      const isFileMessage = res.data.message?.includes(BUGKET_STORAGE);
      setIsFileMessage(isFileMessage)
      if (isFileMessage) {
        setLatestMessage("File Attach");
      } else {
        setLatestMessage(res.data.message)
      }

    })
  }, [])
  return (
    <div
      onClick={() => setSelectedChatRoom(chatRoomItem)}
      className={`${styles.chat_room_main} ${chatRoomItem._id === selectedChatRoom?._id && `${styles.active}`}`}
    >
      <img src={chatRoomItem.participants[0].profile_image} alt="" />
      <div className='ml-5'>
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