
import style from "@/styles/profile/customer/purchase/customerPurchase.module.scss"
import PurchaseStatusBar from "../../Component/PurchaseStatusBar";
import { useEffect, useState } from "react";
import { IUser } from "@/pages/chat";
import { ICustomerPurchaseOrder, IFreelancePurchaseOrder, IPurchaseOrder } from "@/models/purchaseOrder";
import { getFreelancePurchaseOrder, updatePurchaseOrderStatus } from "@/services/purchaseOrder/purchaseOrder.api";
import FreelancePurchaseItem from "./FreelancePurchaseItem";
import ProfileSelectBarFreelance from "../ProfileSelectBar";
import { WISH_LIST } from "@/config/constants";

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

                <div className="fixed inset-0 bg-white z-3 mt-20" style={{ width: "22%" }}>
                    <ProfileSelectBarFreelance activeMenu="purchase" />
                </div>

                <div className={style.main}>
                    <div className="fixed inset-0 z-3 mt-24 ml-80 ">
                        <div className="text-xl font-semibold mb-1 ml-4">การซื้อและการจ้างของฉัน</div>
                        <PurchaseStatusBar role="freelance" setStatus={setStatus} />
                    </div>
                    <div className="ml-80 fixed mt-44 inset-0 overflow-y-auto">
                    {order.length === 0 && (
                            <div className="flex justify-center items-center flex-col h-full -mt-6">
                                <img src={WISH_LIST} className="sm:h-64 ml-4 h-96" alt="Empty Cart" />
                                <div className="mt-2 text-center text-gray-500">ยังไม่มีรายการ</div>
                            </div>
                        )}
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