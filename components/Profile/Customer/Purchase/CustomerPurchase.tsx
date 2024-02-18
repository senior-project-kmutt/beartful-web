
import style from "@/styles/profile/customer/purchase/customerPurchase.module.scss"
import NavBar from "@/components/Layout/NavBar";
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
    return (
        <>
            <NavBar />
            <div className="flex">
                <div style={{width: "18%"}}>
                    <ProfileSelectBarCustomer activeMenu='purchase' />
                </div>

                <div id="add_artwork" className={style.main}>
                    <div>การซื้อและการจ้างของฉัน</div>
                    <PurchaseStatusBar role="customer" setStatus={setStatus} />
                    {order.map((item, index) => {
                        return (
                            <CustomerPurchaseItem item={item} key={index} user={user} updateStatus={updateStatus} />
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default CustomerPurchase;