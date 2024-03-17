import style from '@/styles/profile/changePassword.module.scss'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useState } from 'react';
interface Props {
    userId: string
}
const ChangePassword = (props: Props) => {
    const { userId } = props
    const router = useRouter()
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword)
    }

    const toggleConfirmNewPassword = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword)
    }

    return (
        <div>
            <h1 className={style.title}>เปลี่ยนรหัสผ่าน</h1>
            <p className={style.warning}>จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</p>
            <div className='mt-8'>
                <div className={style.rows}>
                    <label htmlFor="newPassword">รหัสผ่านใหม่</label>
                    <input type={showNewPassword ? 'text' : 'password'} name="newPassword" id="newPassword" />
                    {showNewPassword ? (
                        <FontAwesomeIcon className='cursor-pointer' icon={faEye} onClick={toggleShowNewPassword} />
                    ) : (
                        <FontAwesomeIcon className='cursor-pointer' icon={faEyeSlash} onClick={toggleShowNewPassword} />
                    )}
                </div>
                <div className={style.rows}>
                    <label htmlFor="confirmNewPassword">ยืนยันรหัสผ่านใหม่</label>
                    <input type={showConfirmNewPassword ? 'text' : 'password'} name="confirmNewPassword" id="confirmNewPassword" />
                    {showConfirmNewPassword ? (
                        <FontAwesomeIcon className='cursor-pointer' icon={faEye} onClick={toggleConfirmNewPassword} />
                    ) : (
                        <FontAwesomeIcon className='cursor-pointer' icon={faEyeSlash} onClick={toggleConfirmNewPassword} />
                    )}
                </div>
                <div className={style.button}>
                    <button className={style.submit}>save</button>
                    <button className={style.cancel}>cancel</button>
                </div>
            </div>

        </div>
    );
};

export default ChangePassword;