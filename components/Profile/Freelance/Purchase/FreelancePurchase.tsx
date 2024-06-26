
import style from "@/styles/profile/customer/purchase/customerPurchase.module.scss"
import PurchaseStatusBar from "../../Component/PurchaseStatusBar";
import { useEffect, useState } from "react";
import { IUser } from "@/pages/chat";
import { ICustomerPurchaseOrder, IFreelancePurchaseOrder, IPurchaseOrder } from "@/models/purchaseOrder";
import { getFreelancePurchaseOrder, updatePurchaseOrderStatus } from "@/services/purchaseOrder/purchaseOrder.api";
import FreelancePurchaseItem from "./FreelancePurchaseItem";
import ProfileSelectBarFreelance from "../ProfileSelectBar";
import { WISH_LIST } from "@/config/constants";
import { FadeLoader } from "react-spinners";

interface Props {
    user: IUser
}

const CustomerPurchase = (props: Props) => {
    const { user } = props
    const [status, setStatus] = useState<string>('all')
    const [order, setOrder] = useState<IFreelancePurchaseOrder[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        getOrderByStatus()
    }, [status])

    const getOrderByStatus = async () => {
        const token = localStorage.getItem("auth");

        if (token) {
            setIsLoading(true)
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            await getFreelancePurchaseOrder(user.id, status, headers).subscribe((res => {
                setOrder(res.data as IFreelancePurchaseOrder[])
                setIsLoading(false)
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
            <div>
                <div className="fixed inset-0 bg-white z-3 mt-20 sm:w-1/4 lg:w-1/5 xl:w-1/6">
                    <ProfileSelectBarFreelance activeMenu='purchase' />
                </div>

                <div className="fixed ml-0 sm:ml-80 mt-44 sm:mt-24 md:mt-5 lg:mt-28 xl:mt-28 inset-0" style={{ maxHeight: 'calc(100vh - 32px)', zIndex: 20, overflow: 'hidden' }}>
                    <div className="text-xl font-bold ml-10 sm:mt-24 lg:mt-0 xl:mt-0">การซื้อและการจ้างของฉัน</div>
                    <div className="flex justify-center items-center">
                        <PurchaseStatusBar role="freelance" setStatus={setStatus} />
                    </div>

                    {isLoading ? (
                        <div className={style.loader}>
                            <FadeLoader color="#E78353" />
                        </div>

                    ) : (
                        <div className="overflow-y-auto" style={{ maxHeight: '100vh', overflowX: 'hidden' }}>
                            {order.length === 0 && (
                                <div className="flex justify-center items-center flex-col h-full mt-16">
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
                    )}
                </div>
            </div>
        </>
    );
};

export default CustomerPurchase;