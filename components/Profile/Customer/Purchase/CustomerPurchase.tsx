
import style from "@/styles/profile/customer/purchase/customerPurchase.module.scss"

import NavBar from "@/components/Layout/NavBar";
import ProfileSelectBar from "@/components/Profile/Customer/ProfileSelectBar";
import PurchaseStatusBar from "../../Component/PurchaseStatusBar";
import { useEffect, useState } from "react";
import PurchaseItem from "../../Component/PurchaseItem";
import { IPurchaseOrder } from "@/models/purchaseOrder";
import { getCustomerPurchaseOrder } from "@/services/purchaseOrder/purchaseOrder.api";
import { IUser } from "@/pages/chat";
interface Props {
    user: IUser
}
const CustomerPurchase = (props: Props) => {
    const { user } = props
    const [status, setStatus] = useState<string>('all')
    const [order, setOrder] = useState<IPurchaseOrder[]>([])
    useEffect(() => {
        getOrderByStatus()
    }, [status])

    const getOrderByStatus = async () => {
        const token = localStorage.getItem("auth");

        if (token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            await getCustomerPurchaseOrder(user.id, status, headers).subscribe((res => {
                setOrder(res.data as IPurchaseOrder[])
            }))
        }
    }
    return (
        <>
            <NavBar />
            <div className="flex">
                <div className={style.sideBar}>
                    <ProfileSelectBar />
                </div>

                <div id="add_artwork" className={style.main}>
                    <div>การซื้อและการจ้างของฉัน</div>
                    <PurchaseStatusBar role="customer" setStatus={setStatus} />
                    {order.map((item, index) => {
                        return (
                            <PurchaseItem item={item} key={index} />
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default CustomerPurchase;