
import style from "@/styles/cart/cart.module.scss"
import NavBar from "../Layout/NavBar";
import CartSelectBar from "./CartSelectBar";
import { useEffect, useState } from "react";
import CartReadyMade from "./CartReadyMade";
import CartHiringStatusBar from "./CartHiringStatusBar";
import { CartItem, Carts, HiringCarts } from "@/models/cart";
import { getCart } from "@/services/cart/cart.api";
import CartHiringItem from "./CartHiringItem";
import { IUser } from "@/pages/chat";
import { useRouter } from "next/router";
import { getQuotationByCustomerId } from "@/services/quotation/quotation.api";

const CustomerCart = () => {
    const [type, setType] = useState<string>('hired')
    const [cart, setCart] = useState<Carts[]>([])
    const [hiringcart, setHiringCart] = useState<HiringCarts[]>([])
    const [user, setUser] = useState<IUser>();
    const [netAmount, setNetAmount] = useState<number>(0)
    const router = useRouter();

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user") || ""));
    }, [])

    useEffect(() => {
        if (user) {
            getCarts(user);
        }
    }, [type, user])

    const updateCartWhenItemUpdated = (cartItem: CartItem) => {
        const updatedCart = cart.map((item) => {
            item.cartItem = item.cartItem.map((i) => {
                if (i._id === cartItem._id) {
                    return { ...cartItem };
                } else {
                    return i;
                }
            });
            return item;
        });
        setCart(updatedCart);
        setNetAmount(sumTotalNetAmountForChecked(cart))
    };

    const sumTotalNetAmountForChecked = (carts: Carts[]): number => {
        return carts.reduce((totalNetAmount, cart) => {
            cart.cartItem.forEach(item => {
                if (item.checked) {
                    totalNetAmount += item.netAmount;
                }
            });
            return totalNetAmount;
        }, 0);
    };

    const getCarts = async (user: IUser) => {
        const token = localStorage.getItem("auth");
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        await getCart(user.id, type).subscribe((res => {
            setNetAmount(sumTotalNetAmountForChecked(res.data as Carts[]))
            setCart(res.data as Carts[])
        }))

        await getQuotationByCustomerId(user.id, headers).then(res => {
            setHiringCart(res)
        })
    }

    return (
        <>
            <NavBar />
            <div>
                <div className={style.sideBar}>
                    <CartSelectBar type={type} setType={setType} />
                </div>

                <div id="cart_item" className={style.main}>
                    {type === 'hired' && (
                        <div className="overflow-y-auto h-screen">
                            {hiringcart.map((item, index) => {
                                return (
                                    <div style={{ position: 'relative' }} key={index}>
                                        <CartHiringItem item={item} />
                                    </div>
                                )
                            })}
                        </div>
                    )}
                    {type === 'readyMade' && (
                        <div className="overflow-y-auto h-screen">
                            <div className=" mt-2 rounded-t-lg">
                                {cart.map((item, index) => {
                                    return (
                                        <div style={{ position: 'relative' }} key={index}>
                                            <CartReadyMade item={item} />
                                        </div>
                                    )
                                })}</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CustomerCart;

{/* <div className="overflow-y-auto h-screen">
                        {order.map((item, index) => {
                            return (
                                <div style={{ position: 'relative' }} key={index}>
                                    <FreelancePurchaseItem item={item} updateStatus={updateStatus} />
                                </div>
                            )
                        })}
                    </div> */}