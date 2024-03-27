import style from '@/styles/profile/changePassword.module.scss'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import bcrypt from "bcryptjs";
import { updatePassword } from '@/services/user/user.api';
interface Props {
    userId: string
}

interface IUpdatePassword {
    newPassword: string
    confirmNewPassword: string
}

const ChangePassword = (props: Props) => {
    const { userId } = props
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm<IUpdatePassword>();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [showErrorNotMatch, setShowErrorNotMatch] = useState(false);

    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword)
    }

    const toggleConfirmNewPassword = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword)
    }

    const onSubmit = handleSubmit(async (data) => {
        if (data.newPassword !== data.confirmNewPassword) {
            setShowErrorNotMatch(true)
        } else {
            Swal.fire({
                title: "ยืนยันการเปลี่ยนรหัสผ่านของคุณ",
                text: "โปรดตรวจสอบรหัสผ่านใหม่ให้ถูกต้อง",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "ยืนยัน",
                cancelButtonText: "ตรวจสอบข้อมูลอีกครั้ง"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const encryptPassword = await bcrypt.hash(data.newPassword as string, 10);
                    const token = localStorage.getItem("auth");
                    const headers = {
                        Authorization: `Bearer ${token}`,
                    };
                    const body = {
                        password: encryptPassword
                    }
                    await updatePassword(userId, body, headers).then(_ => {
                        setValue('newPassword', '');
                        setValue('confirmNewPassword', '');
                        Swal.fire({
                            icon: "success",
                            title: "เปลี่ยนรหัสผ่านสำเร็จ",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    })
                }
            });
        }
    });

    const handleOnInputChange = (fieldName: string) => {
        if (fieldName === "newPassword" || fieldName === "confirmNewPassword") {
            setShowErrorNotMatch(false);
            clearErrors(fieldName);
        }
    }

    return (
        <div>
            <h1 className={style.title}>เปลี่ยนรหัสผ่าน</h1>
            <p className={style.warning}>จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</p>
            <form onSubmit={onSubmit}>
                <div className='mt-8'>
                    <div className={style.rows}>
                        <label htmlFor="newPassword">รหัสผ่านใหม่</label>
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            id="newPassword"
                            {...register("newPassword", { required: true })}
                            className={`${style.input} ${errors.newPassword && `${style.error_input}`}`}
                            onChange={() => handleOnInputChange('newPassword')}
                        />
                        {showNewPassword ? (
                            <FontAwesomeIcon className='cursor-pointer' icon={faEye} onClick={toggleShowNewPassword} />
                        ) : (
                            <FontAwesomeIcon className='cursor-pointer' icon={faEyeSlash} onClick={toggleShowNewPassword} />
                        )}
                    </div>
                    <div className={style.rows}>
                        <label htmlFor="confirmNewPassword">ยืนยันรหัสผ่านใหม่</label>
                        <input
                            type={showConfirmNewPassword ? 'text' : 'password'}
                            id="confirmNewPassword"
                            {...register("confirmNewPassword", { required: true })}
                            className={`${style.input} ${errors.confirmNewPassword && `${style.error_input}`}`}
                            onChange={() => handleOnInputChange('confirmNewPassword')}
                        />
                        {showConfirmNewPassword ? (
                            <FontAwesomeIcon className='cursor-pointer' icon={faEye} onClick={toggleConfirmNewPassword} />
                        ) : (
                            <FontAwesomeIcon className='cursor-pointer' icon={faEyeSlash} onClick={toggleConfirmNewPassword} />
                        )}
                    </div>
                    <div className={style.rows}>
                        <label></label>
                        {showErrorNotMatch && (
                            <p className='text-sm text-red-600'>รหัสผ่านไม่ตรงกัน</p>
                        )}
                    </div>
                    <div className={style.button}>
                        <button className={style.submit} onClick={onSubmit}>บันทึก</button>
                        <button className={style.cancel}>ยกเลิก</button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default ChangePassword;