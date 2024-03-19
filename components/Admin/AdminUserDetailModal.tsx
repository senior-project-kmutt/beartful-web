import { Modal } from 'flowbite-react';
import style from "@/styles/admin/adminManageUser.module.scss"
import { FreelanceUsers } from '@/models/users';
import { Dispatch, SetStateAction } from 'react';
import { formatBirthDate, formatDateDetailUser, formatDateTime } from '@/core/tranform';

interface Props {
    setOpenDetailModal: Dispatch<SetStateAction<boolean>>;
    data: FreelanceUsers
}
const AdminUserDetailModal = (props: Props) => {
    const { setOpenDetailModal, data } = props;

    return (
        <Modal size={'4xl'} show={true} className={style.detailTransactionModal} onClose={() => setOpenDetailModal(false)}>
            <Modal.Header className={style.header}><h1>ข้อมูลผู้ใช้งาน</h1></Modal.Header>
            <Modal.Body>
                <div className={style.group}>
                    <div className={style.profileImg}><img src={data.profileImage} alt={data.username} /></div>
                    <div className={style.personal}>
                        <div className="font-bold text-[#C3734D]">ข้อมูลส่วนตัว</div>
                        <p>ชื่อผู้ใช้งาน</p>
                        <h4>{data.username}</h4>
                        <p>ชื่อ-นามสกุล</p>
                        <h4>{data.firstname} {data.lastname}</h4>
                        <p>วัน เดือน ปีเกิด</p>
                        <h4>{formatBirthDate(data.dateOfBirth)}</h4>
                    </div>
                    <div className={style.contact}>
                        <div className="font-bold text-[#C3734D]">การติดต่อ</div>
                        <p>เบอร์โทรศัพท์</p>
                        <h4>{data.phoneNumber}</h4>
                        <p>อีเมล</p>
                        <h4>{data.email}</h4>
                        <h5 className="text-xs mt-5 text-gray-500">สร้างบัญชีเมื่อ {formatDateDetailUser(data.createdAt)}</h5>
                        <h5 className="text-xs text-gray-500">การเปลี่ยนแปลงล่าสุด {formatDateDetailUser(data.updatedAt)}</h5>
                    </div>
                    <div className={style.role}>
                        <div className={style.buttonRole}>{data.role}</div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default AdminUserDetailModal;