import { Carts } from "@/models/cart";
import style from "@/styles/cart/readyMadeCartItem.module.scss"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartReadyMadeItem from "./CartReadyMadeItem";

interface Props {
    item: Carts,
}

const CartReadyMade = (props: Props) => {
    const { item } = props

    return (
        <div>
            <div className={style.cartItem}>
            <div className={style.profile}>
                <FontAwesomeIcon icon={faUser} size="sm" style={{ marginTop: "4px" }}></FontAwesomeIcon>
                <p className={style.username}>{item.freelanceUsername}</p>
                <div className="ml-8">
                    <button className={style.cancelButton}>View profile</button>
                </div>
            </div>
            {item.cartItem.map((item) => {
                return (
                    <>
                        <CartReadyMadeItem item={item} />
                    </>
                )
            })}

        </div>
        </div>
    );
};

export default CartReadyMade;