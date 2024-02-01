
import style from "@/styles/cart/readyMadeCartItem.module.scss"
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const CartReadyMadeItem = () => {
    const [quantity, setQuantity] = useState<number>(1);

    return (
        <div className={style.cartItem}>
            <div className={style.profile}>
                <FontAwesomeIcon icon={faUser} size="sm" style={{ marginTop: "4px" }}></FontAwesomeIcon>
                <p className={style.username}> shop name</p>
                <div className="ml-8">
                    <button className={style.saveButton}>Chat</button>
                    <button className={style.cancelButton}>View profile</button>
                </div>
            </div>
            <div className={style.order}>
                <img className={style.userImage} src="../../xxxx"></img>
                <div className={style.detail}>
                    <p className={style.artworkName}>Artwork Name</p>
                    <span className={style.description}>[  คำอธิบายงานจ้าง เช่น ของที่จะได้ วันมอบงาน  ]</span>
                </div>
                <div className={style.price}>XXXX Baht</div>
                <div className={style.quantity}>
                    <button onClick={() => setQuantity(quantity - 1)}>-</button>
                    <input type="number" value={quantity}></input>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <div className={style.netAmount}>XXXX Baht</div>
                <div className={style.confirm}>
                    <FontAwesomeIcon icon={faTrash} style={{ color: '#5A2810' }} size="2xl"></FontAwesomeIcon>
                </div>
            </div>
        </div>

    );
};

export default CartReadyMadeItem;