
import { deleteUser } from '@/services/user/user.api';
import style from '@/styles/profile/deleteAccount.module.scss'
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
interface Props {
    userId: string
}
const DeleteAccountComponent = (props: Props) => {
    const { userId } = props
    const router = useRouter()

    const handleDeleteAccount = () => {
        Swal.fire({
            title: "ยืนยันการลบบัญชีหรือไม่",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก"
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("auth");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                deleteUser(userId, headers).then(_ => {
                    Swal.fire({
                        icon: "success",
                        title: "ลบบัญชีสำเร็จ",
                        showConfirmButton: false,
                        timer: 1200
                    }).then((result) => {
                        if (result.isConfirmed || result.isDismissed) {
                            localStorage.removeItem("auth");
                            localStorage.removeItem("user");
                            router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/`);
                        }
                    });

                })
            }
        });

    }

    return (
        <div>
            <h1 className={style.title}>ลบบัญชีของฉัน</h1>
            <p className={style.warning}>**เมื่อคุณลบบัญชีของคุณแล้ว จะไม่สามารถย้อนกลับได้</p>
            <button className={style.button_delete} onClick={handleDeleteAccount}>ลบบัญชีของฉัน</button>
        </div>
    );
};

export default DeleteAccountComponent;