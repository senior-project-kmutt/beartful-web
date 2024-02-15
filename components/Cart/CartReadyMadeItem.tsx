
import { CartItem } from "@/models/cart";
import style from "@/styles/cart/hiringCartItem.module.scss"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

interface Props {
    item: CartItem
}

const CartReadyMadeItem = (props: Props) => {
    const router = useRouter()
    const { item } = props
    return (
        <div className={style.cartItem}>
            <div className={style.formGrid}>
                <div className={style.information}>
                    <img className={style.userImage} src="../../xxxx"></img>
                    <div className={style.detail}>
                        <p className={style.artworkName}>{item.artworkName}</p>
                        <p className={style.description}>{item.description}</p>
                    </div>
                </div>
                <div className={style.price}>{item.amount} Baht</div>
                <div className={style.confirm}>
                    <button className={style.confirmButton} onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/cart/review-order-readyMade?item=${item._id}`)}>จัดจ้าง</button>
                    <FontAwesomeIcon icon={faTrash} style={{ color: '#5A2810' }} size="2xl"></FontAwesomeIcon>
                </div>
            </div>
        </div>

    );
};

export default CartReadyMadeItem;