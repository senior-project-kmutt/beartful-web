
import style from "@/styles/cart/cart.module.scss"
import NavBar from "../Layout/NavBar";
import CartSelectBar from "./CartSelectBar";
import { useState } from "react";
import CartHiringItem from "./CartHiringItem";
import CartReadyMadeItem from "./CartReadyMadeItem";
import CartHiringStatusBar from "./CartHiringStatusBar";
import CartReadyMadeStatusBar from "./CartReadyMadeStatusBar";
const CustomerCart = () => {
    const [type, setType] = useState<string>('hired')
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
                            <CartHiringItem />
                            <CartHiringItem />
                            <CartHiringItem />
                            <CartHiringItem />
                            <CartHiringItem />
                        </>
                    )}
                    {type === 'readyMade' && (
                        <>
                            <div className={style.heading}>Cart: Ready Made</div>
                            <CartReadyMadeStatusBar />
                            <CartReadyMadeItem />
                            <CartReadyMadeItem />
                            <CartReadyMadeItem />
                            <CartReadyMadeItem />
                            <CartReadyMadeItem />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default CustomerCart;