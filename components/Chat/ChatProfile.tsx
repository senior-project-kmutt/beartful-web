import { IParticipant } from '@/pages/chat';
import styles from "@/styles/chat/chat.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUserCheck } from '@fortawesome/free-solid-svg-icons';


interface Props {
  profile: IParticipant
}

const ChatProfile = (props: Props) => {
  const { profile } = props
  const rate = 5;

  const getDate = (dateTime?: Date) => {
    const months = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
    if (dateTime) {
      const convertToDate = new Date(dateTime)
      const date = String(convertToDate.getDate()).padStart(2, '0');
      const monthIndex = convertToDate.getMonth();
      const year = String(convertToDate.getFullYear())
      return `${date} ${months[monthIndex]} ${year}`
    }
  }

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < rate; i++) {
      stars.push(
        <FontAwesomeIcon key={i} className='ml-1' icon={faStar} />
      );
    }
    return stars;
  };

  return (
    <div className={styles.profile_warp}>
      <img src={profile.profileImage} alt="" />
      <p className='text-3xl font-bold mt-5'>{profile.username}</p>
      <p className='text-xl font-bold text-stone-500 py-2'>{profile.firstname} {profile.lastname}</p>
      <div className={styles.role}>
        <FontAwesomeIcon className='mr-1' icon={faUserCheck} size='sm' />
        {profile.role}
      </div>
      <div className={styles.info}>
        <table>
          <tr>
            <td>เป็นสมาชิกเมื่อ</td>
            <td className='text-right'>{getDate(profile.createdAt)}</td>
          </tr>
          {profile.role === 'freelance' && (
            <>
              <tr>
                <td>ขายงานแล้ว</td>
                <td className='text-right'>0 ครั้ง</td>
              </tr>
              <tr>
                <td>อัตราการทำงานสำเร็จ</td>
                <td className='text-right'>0 %</td>
              </tr>
            </>
          )}
          {profile.role === 'customer' && (
            <>
              <tr>
                <td>อัตราการจ้างงานสำเร็จ</td>
                <td className='text-right'>0 %</td>
              </tr>
              <tr>
                <td>อัตราการยกเลิก</td>
                <td className='text-right'>0 %</td>
              </tr>
            </>
          )}
          <tr>
            <td>คะแนนรีวิว</td>
            <td className={`${styles.star} text-right`}>{renderStars()}</td>
          </tr>
        </table>
      </div>
      <div className={styles.view_profile}>
        VIEW PROFILE
      </div>
    </div>
  );
}

export default ChatProfile