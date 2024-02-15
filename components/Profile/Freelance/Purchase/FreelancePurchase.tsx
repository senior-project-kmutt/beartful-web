
import style from "@/styles/profile/customer/purchase/customerPurchase.module.scss"
import NavBar from "@/components/Layout/NavBar";
import ProfileSelectBar from "@/components/Profile/Customer/ProfileSelectBar";
import PurchaseStatusBar from "../../Component/PurchaseStatusBar";
import { useEffect, useState } from "react";
import { IUser } from "@/pages/chat";
import { ICustomerPurchaseOrder, IFreelancePurchaseOrder, IPurchaseOrder } from "@/models/purchaseOrder";
import { getFreelancePurchaseOrder } from "@/services/purchaseOrder/purchaseOrder.api";
import FreelancePurchaseItem from "./FreelancePurchaseItem";

interface Props {
    user: IUser
}

const CustomerPurchase = (props: Props) => {
    const { user } = props
    const [status, setStatus] = useState<string>('all')
    const [order, setOrder] = useState<IFreelancePurchaseOrder[]>([])
    useEffect(() => {
        getOrderByStatus()
    }, [status])

    const getOrderByStatus = async () => {
        const token = localStorage.getItem("auth");

        if (token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            await getFreelancePurchaseOrder(user.id, status, headers).subscribe((res => {
                setOrder(res.data as IFreelancePurchaseOrder[])
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

                <div className={style.main}>
                    <div>การซื้อและการจ้างของฉัน</div>
                    <PurchaseStatusBar role="freelance" setStatus={setStatus} />
                    {order.map((item, index) => {
                        return (
                            <FreelancePurchaseItem item={item} key={index} />
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default CustomerPurchase;