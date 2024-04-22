
import style from "@/styles/profile/customer/purchase/customerPurchase.module.scss"
import PurchaseStatusBar from "../../Component/PurchaseStatusBar";
import { useEffect, useState } from "react";
import { IUser } from "@/pages/chat";
import { ICustomerPurchaseOrder, IFreelancePurchaseOrder, IPurchaseOrder } from "@/models/purchaseOrder";
import { getFreelancePurchaseOrder, updatePurchaseOrderStatus } from "@/services/purchaseOrder/purchaseOrder.api";
import FreelancePurchaseItem from "./FreelancePurchaseItem";
import ProfileSelectBarFreelance from "../ProfileSelectBar";

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

    const updateStatus = async (purchaseOrderId: string, status: string) => {
        const token = localStorage.getItem("auth");
        if (token) {
            if (user) {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                try {
                    const updatedPurchaseOrder = order.map((item) => {
                        const updatedOrders = item.order.map((i) => {
                            if (i.purchaseOrder._id === purchaseOrderId) {
                                return { ...i, purchaseOrder: { ...i.purchaseOrder, status: status } };
                            }
                            return i;
                        });
                        return { ...item, order: updatedOrders };
                    });
                    setOrder(updatedPurchaseOrder);
                    await updatePurchaseOrderStatus(purchaseOrderId, status, headers);
                } catch (error) {
                    console.error("Error edit artwork:", error);
                }
            }
        }
    }

    return (
        <>
            <div className="flex mt-16">

                <div className={style.sideBar} style={{ width: "22%" }}>
                    <ProfileSelectBarFreelance activeMenu="purchase" />
                </div>

                <div className={style.main}>
                    <div className="text-xl font-semibold mb-1">การซื้อและการจ้างของฉัน</div>
                    <PurchaseStatusBar role="freelance" setStatus={setStatus} />
                    <div className="overflow-y-auto h-screen">
                        {order.map((item, index) => {
                            return (
                                <div style={{ position: 'relative' }} key={index}>
                                    <FreelancePurchaseItem item={item} updateStatus={updateStatus} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomerPurchase;