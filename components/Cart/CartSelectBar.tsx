import style from "@/styles/cart/cart.module.scss";
import { Dispatch, SetStateAction } from "react";

interface Props {
    type: string
    setType: Dispatch<SetStateAction<string>>;
}
const CartSelectBar = (props: Props) => {
    const { setType, type } = props

    return (
        <>
            <div className={style.artwork_category}>
                <div className={style.warp}>
                    <div className={style.switch}>
                        <div className={type === 'hired' ? `${style.item_active}` : `${style.item}`} onClick={() => setType('hired')}>Hiring</div>
                        <div className={type === 'readyMade' ? `${style.item_active}` : `${style.item}`} onClick={() => setType('readyMade')}>Ready Made</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartSelectBar;