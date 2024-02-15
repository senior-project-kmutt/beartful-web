
import style from "@/styles/cart/readyMadeCart.module.scss"
import { useState } from "react";

const label = ['ผลงานศิลปะ', 'ราคา', 'แอคชั่น']
// const label = ['ผลงานศิลปะ', 'ราคา', 'จำนวน', 'ราคารวม', 'แอคชั่น']

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