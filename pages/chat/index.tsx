import { useEffect, useRef, useState } from "react";
import styles from "@/styles/chat/chat.module.scss";
import { getChatRoomByUserId } from "@/services/chat/chat.api";
import ChatRoomItem from "@/components/Chat/ChatRoomItem";
import ChatMessage from "@/components/Chat/ChatMessage";
import NavBar from "@/components/Layout/NavBar"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export interface IChatRoom {
  participants: IParticipant[];
  chat_room_id: number;
  _id: string;
}

export interface IParticipant {
  user_id: string;
  username: string;
  firstname: string;
  lastname: string;
  role: string;
  profileImage: string;
  createdAt: Date
}

export interface IUser {
  id: string;
  username: string;
  profileImage: string;
  role: string;
}

export default function Home() {
  const router = useRouter();
  const [chatRoom, setChatRoom] = useState<IChatRoom[]>([])
  const [user, setUser] = useState<IUser>()
  const [selectedChatRoom, setSelectedChatRoom] = useState<IChatRoom>()
  const [chatRoomId, setChatRoomId] = useState<string>()

  useEffect(() => {
    const userFromSession = localStorage.getItem('user');
    if (userFromSession) {
      setUser(JSON.parse(userFromSession))
    } else {
      router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/`)
    }
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const chatRoomId = params.get('chatRoom');
    if (chatRoomId) {
      setChatRoomId(chatRoomId)
    } 
  }, []);

  useEffect(() => {
    if (chatRoomId && chatRoom) {
      const filterChatRoom = chatRoom.filter(item => item._id === chatRoomId)
      if (filterChatRoom) {
        setSelectedChatRoom(filterChatRoom[0])
      }
    }
  }, [chatRoomId, chatRoom]);

  useEffect(() => {
    const token = localStorage.getItem('auth');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    if (user) {
      getChatRoomByUserId(user?.id, headers).then(res => {
        const cleanData = transformData(res)
        setChatRoom(cleanData)
      })
        .catch(error => console.log(error));
    }
  }, [user]);

  const transformData = (data: IChatRoom[]) => {
    return data.map((item) => {
      const filterParticipants = item.participants.filter((item) => {
        return item.user_id !== user?.id
      })
      return {
        ...item,
        participants: filterParticipants
      }
    })
  }

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.chat_room}>
          <h1 className="font-extrabold underline underline-offset-2 p-3 mb-4">แชท</h1>
          <div>
            {chatRoom.map((item) => {
              return (
                <>
                  <ChatRoomItem
                    chatRoomItem={item}
                    selectedChatRoom={selectedChatRoom}
                    setChatRoomId={setChatRoomId}
                  />
                </>
              )
            })}
          </div>
        </div>
        {selectedChatRoom ? (
          <div className={styles.chat_messages}>
            <ChatMessage
              selectedChatRoom={selectedChatRoom}
              participants={selectedChatRoom?.participants}
            />
          </div>
        ) : (
          <div className={styles.chat_messages}>
            <div className={styles.no_message}>
              <div className={styles.icon}><FontAwesomeIcon icon={faMessage} size="lg" /></div>
              <p className={styles.text}>เลือกห้องแชทเพื่ออ่านข้อความ</p>
              <p>. . .</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
