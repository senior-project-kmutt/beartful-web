import { useEffect, useState } from "react";
import NavBar from "../Layout/NavBar";
import style from "@/styles/cart/reviewOrder.module.scss"
import { Carts } from "@/models/cart";
import { IUser } from "@/pages/chat";
import { getReviewOrderCart } from "@/services/cart/cart.api";
import ReviewCartOrderItem from "./ReviewCartOrderItem";
import { formattedPrice } from "@/core/tranform";

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

    const sumTotalNetAmount = (carts: Carts[]): number => {
        return carts.reduce((totalNetAmount, cart) => {
            cart.cartItem.forEach(item => {
                totalNetAmount += item.netAmount;
            });
            return totalNetAmount;
        }, 0);
    };

    return (
        <div className="mr-10 ml-10">
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
            <div className="rounded-t-lg">
                {cart.map((item, index) => {
                    return (
                        <ReviewCartOrderItem data={item} key={index} />
                    )
                })}
            </div>
            <div className={style.paymentMethod}>
                <p>วิธีการชำระเงิน</p>
                <button>QR PromptPay</button>
                <button>Credit / Debit Card</button>
            </div>
            <div className={style.amountBlock}>
                <div className={style.payment}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>รวมการสั่งซื้อ / จ้าง</div>
                        <div>{formattedPrice(sumTotalNetAmount(cart))} บาท</div>
                        <div>ยอดชำระเงินทั้งหมด</div>
                        <div className={style.totalAmount}>{formattedPrice(sumTotalNetAmount(cart))} บาท</div>
                    </div>
                </div>
            </div>
            <div className={style.buttonConfirm}>
                <button className={style.backButton}>ย้อนกลับ</button>
                <button className={style.purchaseButton}>ชำระเงิน</button>
            </div>
        </div>
    );
};

export default ReviewCartOrder;