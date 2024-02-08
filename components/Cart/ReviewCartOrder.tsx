import { useEffect, useState } from "react";
import NavBar from "../Layout/NavBar";
import style from "@/styles/cart/reviewOrder.module.scss"
import { Carts } from "@/models/cart";
import { IUser } from "@/pages/chat";
import { getReviewOrderCart } from "@/services/cart/cart.api";
import ReviewCartOrderItem from "./ReviewCartOrderItem";

const ReviewCartOrder = () => {
    const label = ['ผลงานที่จัดซื้อ/จัดจ้าง', 'ราคาต่อหน่วย', 'จำนวน', 'รายการย่อย']

    const [cart, setCart] = useState<Carts[]>([])
    const [user, setUser] = useState<IUser>();


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user") || ""));
    }, [])

    useEffect(() => {
        if (user) {
            getCarts(user);
        }
    }, [user])

    const getCarts = async (user: IUser) => {
        await getReviewOrderCart(user.id, 'readyMade').subscribe((res => {
            setCart(res.data as Carts[])
        }))
    }

    return (
        <>
            <NavBar />
            <div className={style.container}>
                <div className={style.heading}>ยืนยันการจัดซื้อ / จัดจ้าง</div>
                <div className={style.reviewCartOrderStatus}>
                    <div className={style.formGrid}>
                        {label.map((item, index) => {
                            return (
                                <p key={index} className={`${style.item}`}>{item}</p>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="rounded-t-lg ml-10 mr-10">
                {cart.map((item, index) => {
                    return (
                        <ReviewCartOrderItem data={item} key={index} />
                    )
                })}
            </div>

        </>
    );
};

export default ReviewCartOrder;