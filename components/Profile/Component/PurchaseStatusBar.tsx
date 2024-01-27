
import style from "@/styles/profile/purchase.module.scss"
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
    role: string;
    setStatus: Dispatch<SetStateAction<string>>;
}

const customerStatus = ['ทั้งหมด', 'ที่ต้องชำระ', 'ที่ต้องได้รับ', 'สำเร็จแล้ว', 'ยกเลิกและขอคืนเงิน']
const freelanceStatus = ['ทั้งหมด', 'รอการชำระ', 'กำลังดำเนินงาน', 'สำเร็จแล้ว', 'ยกเลิกและขอคืนเงิน']

const PurchaseStatusBar = (props: Props) => {
    const { role, setStatus } = props
    const [activeStatus, setActiveStatus] = useState<string>('all')
    const [statusOption, setStatusOption] = useState<string[]>([])

    useEffect(() => {
        if (role === 'customer') {
            setStatusOption(customerStatus)
        } else {
            setStatusOption(freelanceStatus)
        }
    })
    return (
        <div className={style.purchaseStatus}>
            <div className={style.formGrid}>
                {statusOption.map((item, index) => {
                    return (
                        <div key={index}>
                            {/* ถ้าคิดคำได้แล้วอาจจะเอา item มา map คำที่ใช้เก็บใน database งี้แล้ว setActive status */}
                            <p className={activeStatus === item ? `${style.item_active}` : `${style.item}`} onClick={() => {
                                setStatus(item);
                                setActiveStatus(item);
                            }}>{item}</p>
                        </div>
                    )
                })}
            </div>
        </div>

    );
};

export default PurchaseStatusBar;