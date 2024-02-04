
import style from "@/styles/cart/cart.module.scss"
import NavBar from "../Layout/NavBar";
import CartSelectBar from "./CartSelectBar";
import { useEffect, useState } from "react";
import CartReadyMadeItem from "./CartReadyMadeItem";
import CartHiringStatusBar from "./CartHiringStatusBar";
import CartReadyMadeStatusBar from "./CartReadyMadeStatusBar";
import { Carts } from "@/models/cart";
import { getCart } from "@/services/cart/cart.api";
import CartHiringItem from "./CartHiringItem";
import { IUser } from "@/pages/chat";

const CustomerCart = () => {
    const [type, setType] = useState<string>('hired')
    const [cart, setCart] = useState<Carts[]>([])
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user") || ""));
    }, [])

    useEffect(() => {
        if (user) {
            getCarts(user);
        }
    }, [type, user])

    const getCarts = async (user: IUser) => {
        await getCart(user.id, type).subscribe((res => {
            setCart(res.data as Carts[])
        }))
    }

    return (
        <>
            <NavBar />
            <div className="flex">
                <div className={style.sideBar}>
                    <CartSelectBar type={type} setType={setType} />
                </div>

                <div id="cart_item" className={style.main}>
                    {type === 'hired' && (
                        <>
                            <div className={style.heading}>Cart: Hiring</div>
                            <CartHiringStatusBar />
                            {cart.map((item, index) => {
                                return (
                                    <CartHiringItem item={item} key={index} />
                                )
                            })}
                        </>
                    )}
                    {type === 'readyMade' && (
                        <>
                            <div className={style.heading}>Cart: Ready Made</div>
                            <CartReadyMadeStatusBar />
                            {cart.map((item, index) => {
                                return (
                                    <CartReadyMadeItem data={item} key={index} />
                                )
                            })}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CustomerCart;