import { IChatRoom } from '@/pages/chat';
import styles from "@/styles/chat/chat.module.scss";
import { Dispatch, SetStateAction } from 'react';

interface Props {
  chatRoomItem: IChatRoom
  selectedChatRoom?: IChatRoom
  setSelectedChatRoom: Dispatch<SetStateAction<IChatRoom | undefined>>
}

const ChatRoomItem = (props: Props) => {
  const { chatRoomItem, selectedChatRoom, setSelectedChatRoom } = props
  return (
    <div
      onClick={() => setSelectedChatRoom(chatRoomItem)}
      className={`${styles.chat_room_main} ${chatRoomItem._id === selectedChatRoom?._id && `${styles.active}`}`}
    >
      <img src={chatRoomItem.participants[0].profile_image} alt="" />
      <div className='ml-5'>
        <h1 className='font-extrabold'>{chatRoomItem.participants[0].username}</h1>
        <p className={styles.latest_message}>....</p>
      </div>
    </div>
  );
}

export default ChatRoomItem