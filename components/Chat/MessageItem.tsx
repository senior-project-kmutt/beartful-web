import { IUser } from '@/pages/chat';
import styles from "@/styles/chat/chat.module.scss";
import { useEffect, useState } from 'react';
import { IMassage } from './ChatMessage';
import { firebaseConfig } from '@/config/firebase.config';
import { initializeApp } from "firebase/app";
import { getStorage, ref, getMetadata } from "firebase/storage";
import { BUGKET_STORAGE } from '@/config/constants';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fas, far)

interface Props {
  item: IMassage
  isShowProfileImage?: boolean
  profileImage?: string
}

interface IMetaData {
  contentType?: string;
  fullPath?: string;
  name?: string;
  size?: number;
}

const MessageItem = (props: Props) => {
  const { item, isShowProfileImage, profileImage } = props;
  const isFileMessage = item.message.includes(BUGKET_STORAGE)
  const [user, setUser] = useState<IUser>();
  const [metaData, setMetaData] = useState<IMetaData>();
  const [isImage, setIsImage] = useState<boolean>(false);


  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || ""));
    if (isFileMessage) {
      const reference = geReferenceFromFirebaseUrl(item.message)
      initializeApp(firebaseConfig);
      const storage = getStorage();
      const forestRef = ref(storage, reference);

      getMetadata(forestRef)
        .then((matadata) => {
          const transformData: IMetaData = {
            contentType: matadata.contentType,
            fullPath: matadata.fullPath,
            name: matadata.name,
            size: matadata.size
          }
          setMetaData(transformData)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);


  useEffect(() => {
    if (metaData?.contentType?.includes('image/')) {
      setIsImage(true)
    }
  }, [metaData]);

  function geReferenceFromFirebaseUrl(firebaseUrl: string) {
    const url = new URL(firebaseUrl);
    const pathArray = decodeURIComponent(url.pathname).split('/');
    const filename = pathArray.slice(5).join('/');
    return filename;
  }

  function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  }

  const handleDownload = (url: string) => {
    if (isFileMessage && !isImage) {
      const link = document.createElement('a');
      link.download = metaData?.name || 'File from Beartful';
      link.href = url;
      link.click();
    }
  };

  const getTime = (dateTime?: Date) => {
    if (dateTime) {
      const convertToDate = new Date(dateTime)
      const hours = String(convertToDate.getHours()).padStart(2, '0');
      const minutes = String(convertToDate.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`
    }
  }

  const detectAndRenderLinks = (message: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
  
    return message.split(urlRegex).map((part, index) => {
      return urlRegex.test(part) ? (
        <a className='underline text-sky-600' key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      ) : (
        part
      );
    });
  };

  return (
    <div>
      <div>
        <div className={`${item.sender == user?.id ? "flex flex-row-reverse items-start mr-3 mb-2" : "flex justify-start items-start ml-3 mb-2"}`}>
          {(item.sender !== user?.id) && (
            <img className={(item.sender !== user?.id && isShowProfileImage) ? 'mr-3' : 'mr-3 invisible'} src={profileImage} alt="" />
          )}
          <div
            className={item.sender == user?.id ?
              `${styles.message_1} rounded-xl ${isShowProfileImage && `rounded-tr-none`} ${isFileMessage && `cursor-pointer`}` :
              `${styles.message_2} rounded-xl ${isShowProfileImage && `rounded-tl-none`} ${isFileMessage && `cursor-pointer`}`}
            onClick={() => handleDownload(item.message)}
          >
            {isFileMessage ? (
              <div className='break-all'>
                {isImage ? (
                  <div>
                    <img className={styles.image_message} src={item.message} alt="" />
                  </div>

                ) : (
                  <div className={styles.file_message}>
                    <div className={styles.icon}>
                      <FontAwesomeIcon icon={['far', 'file']} size='xl' />
                    </div>
                    <div>
                      <h1>{metaData?.name}</h1>
                      <p>{formatBytes(metaData?.size || 0)}</p>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <p>{detectAndRenderLinks(item.message)}</p>
            )}
          </div>
          <div className={`${styles.time} self-end`}>
            <p>{getTime(item.createdAt)}</p>
          </div>
        </div>
      </div>
    </div >
  )
}

export default MessageItem