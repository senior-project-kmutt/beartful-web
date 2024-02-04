
import { Carts } from "@/models/cart";
import style from "@/styles/cart/hiringCartItem.module.scss"
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    item: Carts
}

const CartHiringItem = (props: Props) => {
    const { item } = props

    return (
        <div className={style.cartItem}>
            <div className={style.profile}>
                <FontAwesomeIcon icon={faUser} size="sm" style={{ marginTop: "4px" }}></FontAwesomeIcon>
                <p className={style.username}>{item.freelanceUsername}</p>
                <div className="ml-8">
                    <button className={style.saveButton}>Chat</button>
                    <button className={style.cancelButton}>View profile</button>
                </div>
            </div>
            {item.cartItem.map((item) => {
                return (
                    <div className={style.order}>
                        <img className={style.userImage} src="../../xxxx"></img>
                        <div className={style.detail}>
                            <p className={style.artworkName}>Artwork Name</p>
                            <span className={style.description}>[  คำอธิบายงานจ้าง เช่น ของที่จะได้ วันมอบงาน  ]</span>
                        </div>
                        <div className={style.price}>{item.netAmount} Baht</div>
                        <div className={style.confirm}>
                            <button className={style.confirmButton}>จัดจ้าง</button>
                            <FontAwesomeIcon icon={faTrash} style={{ color: '#5A2810' }} size="2xl"></FontAwesomeIcon>
                        </div>
                    </div>
                )
            })}

        </div>

    );
};

export default CartHiringItem;