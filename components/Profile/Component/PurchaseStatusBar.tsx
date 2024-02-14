
import { OrderStatusCustomerEnum, OrderStatusFreelanceEnum } from "@/enums/orders";
import style from "@/styles/profile/purchase.module.scss"
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
    role: string;
    setStatus: Dispatch<SetStateAction<string>>;
}

// const customerStatus = ['ทั้งหมด', 'ที่ต้องชำระ', 'ที่ต้องได้รับ', 'สำเร็จแล้ว', 'ยกเลิกและขอคืนเงิน']
// const freelanceStatus = ['ทั้งหมด', 'รอการชำระ', 'กำลังดำเนินงาน', 'สำเร็จแล้ว', 'ยกเลิกและขอคืนเงิน']
const status = ['all', 'pending', 'success', 'cancelled']
// const freelanceStatus = ['all', 'กำลังดำเนินงาน', 'สำเร็จแล้ว', 'ยกเลิกและขอคืนเงิน']

const PurchaseStatusBar = (props: Props) => {
    const { role, setStatus } = props
    const [activeStatus, setActiveStatus] = useState<string>('all')
    const [statusOption, setStatusOption] = useState<string[]>([])

    useEffect(() => {
        setStatusOption(status)
    })

    const getStatus = (item: string) => {
        if (role === 'customer') {
            return OrderStatusCustomerEnum[item as keyof typeof OrderStatusCustomerEnum];
        } else if (role === 'freelance') {
            return OrderStatusFreelanceEnum[item as keyof typeof OrderStatusFreelanceEnum];
        } else {
            return '';
        }
    }
    return (
        <div className={style.purchaseStatus}>
            <div className={style.formGrid}>
                {statusOption.map((item, index) => {
                    return (
                        <div key={index}>
                            <p className={activeStatus === item ? `${style.item_active}` : `${style.item}`} onClick={() => {
                                setStatus(item);
                                setActiveStatus(item);
                            }}>{getStatus(item)}</p>
                        </div>
                    )
                })}
            </div>
        </div>

    );
};

export default PurchaseStatusBar;