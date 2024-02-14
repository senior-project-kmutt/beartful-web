
import { HiringCarts } from "@/models/cart";
import style from "@/styles/cart/hiringCartItem.module.scss"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import CartQuotationHiringItem from "./CartQuotationHiringItem";

interface Props {
    item: HiringCarts
}

const CartHiringItem = (props: Props) => {
    const router = useRouter()
    const { item } = props

    const getDateFormat = (dateTime: Date) => {
        const dateObject = new Date(dateTime);
        const date = dateObject.getDate().toString().padStart(2, '0');
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getFullYear();
        return `${date}/${month}/${year}`;
    }

    return (
        <div className={style.cartItem}>
            <div className={style.profile}>
                <FontAwesomeIcon icon={faUser} size="sm" style={{ marginTop: "4px" }}></FontAwesomeIcon>
                <p className={style.username}>{item.freelanceUsername}</p>
                <div className="ml-8">
                    {/* <button className={style.saveButton}>Chat</button> */}
                    <button className={style.cancelButton}>View profile</button>
                </div>
            </div>
            {item.cartItem.map((item) => {
                return (
                    <>
                        <CartQuotationHiringItem item={item} />
                    </>
                )
            })}

        </div>

    );
};

export default CartHiringItem;