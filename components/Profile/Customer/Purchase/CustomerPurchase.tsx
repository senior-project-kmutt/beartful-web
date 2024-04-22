
import style from "@/styles/profile/customer/purchase/customerPurchase.module.scss"
import ProfileSelectBarCustomer from "@/components/Profile/Customer/ProfileSelectBar";
import PurchaseStatusBar from "../../Component/PurchaseStatusBar";
import { useEffect, useState } from "react";
import { ICustomerPurchaseOrder } from "@/models/purchaseOrder";
import { getCustomerPurchaseOrder, updatePurchaseOrderStatus } from "@/services/purchaseOrder/purchaseOrder.api";
import { IUser } from "@/pages/chat";
import CustomerPurchaseItem from "./CustomerPurchaseItem";
interface Props {
    user: IUser
}
const CustomerPurchase = (props: Props) => {
    const { user } = props
    const [status, setStatus] = useState<string>('all')
    const [order, setOrder] = useState<ICustomerPurchaseOrder[]>([])
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
                setOrder(res.data as ICustomerPurchaseOrder[])
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

    const updateReviewStatus = async (purchaseOrderId: string, status: boolean) => {
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
                                return { ...i, purchaseOrder: { ...i.purchaseOrder, isReview: status } };
                            }
                            return i;
                        });
                        return { ...item, order: updatedOrders };
                    });
                    setOrder(updatedPurchaseOrder);
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
                    <ProfileSelectBarCustomer activeMenu='purchase' />
                </div>

                <div className={style.main}>
                    <div className="fixed inset-0 z-3 mt-24 ml-80 ">
                        <div className="text-xl font-bold ml-10">การซื้อและการจ้างของฉัน</div>
                        <PurchaseStatusBar role="customer" setStatus={setStatus} />
                    </div>

                    <div className="ml-80 fixed  mt-44 inset-0  overflow-y-auto" style={{ maxHeight: 'calc(100vh - 32px)', zIndex: 20 }}>
                        {order.map((item, index) => {
                            return (
                                <div style={{ position: 'relative' }} key={index}>
                                    <CustomerPurchaseItem item={item} user={user} updateStatus={updateStatus} updateReviewStatus={updateReviewStatus} />
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