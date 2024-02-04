
import style from "@/styles/cart/hiringCart.module.scss"
import { useState } from "react";

const label = ['งานจ้าง', 'ราคา', 'action']

const CartHiringStatusBar = () => {
    const [activeStatus, setActiveStatus] = useState<string>('all')

    return (
        <div className={style.purchaseStatus}>
            <div className={style.formGrid}>
                {label.map((item, index) => {
                    return (
                        <div key={index}>
                            <p className={activeStatus === item ? `${style.item_active}` : `${style.item}`} onClick={() => {
                                setActiveStatus(item);
                            }}>{item}</p>
                        </div>
                    )
                })}
            </div>
        </div>

    );
};

export default CartHiringStatusBar;