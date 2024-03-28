import NavBar from "@/components/Layout/NavBar";
import ProfileSelectBarCustomer from "@/components/Profile/Customer/ProfileSelectBar";
import ProfileSelectBarFreelance from "@/components/Profile/Freelance/ProfileSelectBar";
import { IPurchaseOrderDetail } from "@/models/purchaseOrder";
import { IUser } from "@/pages/chat";
import { getPurchaseOrderDetail } from "@/services/purchaseOrder/purchaseOrder.api";
import { useEffect, useState } from "react";
import PurchaseOrderDetail from "@/components/Profile/Component/PurchaseOrderDetail";

const OrderDetail = () => {
    const [user, setUser] = useState<IUser>();
    const [orderId, setOrderId] = useState<string>();
    const [purchaseOrder, setPurchaseOrder] = useState<IPurchaseOrderDetail>();

    useEffect(() => {
        const user: IUser = JSON.parse(localStorage.getItem('user') || '');
        setUser(user);
    }, []);

    useEffect(() => {
        const urlSearchString = window.location.search;
        const params = new URLSearchParams(urlSearchString);
        const order = params.get('order');
        setOrderId(order || '')
    }, []);

    useEffect(() => {
        if (orderId) {
            const token = localStorage.getItem("auth");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            getPurchaseOrderDetail(orderId, headers).subscribe(res => {
                setPurchaseOrder(res.data)
            })
        }
    }, [orderId]);

    return (
        <>
            <NavBar />
            <div className="flex">
                {user?.role === 'freelance' && (
                    <div style={{ width: "22%" }}>
                        <ProfileSelectBarFreelance activeMenu="purchase" />
                    </div>
                )}
                {user?.role === 'customer' && (
                    <div style={{ width: "22%" }}>
                        <ProfileSelectBarCustomer activeMenu="purchase" />
                    </div>
                )}
                <div className={`m-12`} style={{ width: '80%' }}>
                    {purchaseOrder && (
                        <PurchaseOrderDetail purchaseOrder={purchaseOrder} />
                    )}
                </div>
            </div>
        </>
    )
};

export default OrderDetail;
