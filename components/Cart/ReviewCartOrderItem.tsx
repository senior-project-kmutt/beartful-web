import { formattedPrice } from "@/core/tranform";
import { CartItem, Carts } from "@/models/cart";
import style from "@/styles/cart/reviewOrder.module.scss";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface Props {
    data: Carts;
}

const ReviewCartOrderItem = (props: Props) => {
    const { data } = props;
    const [cartItems, setCartItems] = useState<CartItem[]>(data.cartItem);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        setCartItems(data.cartItem);
        setTotalAmount(sumTotalNetAmount);
    }, [data.cartItem]);

    const checkHasFreelanceInCart = () => {
        return cartItems.some((item) => item.freelanceId === data.freelanceId);
    };

    const sumTotalNetAmount = () => {
        return data.cartItem.reduce((totalNetAmount, item) => {
            totalNetAmount += item.netAmount;
            return totalNetAmount;
        }, 0);
    };

    return (
        checkHasFreelanceInCart() && (
            <div className={style.cartOrderItem}>
                <div className={style.profile}>
                    <FontAwesomeIcon
                        icon={faUser}
                        size="sm"
                        style={{ marginTop: "4px" }}
                    ></FontAwesomeIcon>
                    <p className={style.username}>{data.freelanceUsername}</p>
                    <div className="ml-8">
                        <button className={style.saveButton}>แชท</button>
                    </div>
                </div>
                {cartItems.map((item, index) => {
                    return (
                        <div className={style.formGrid} key={index}>
                            <div className={style.information}>
                                <img className={style.userImage} src="../../xxxx"></img>
                                <div className={style.detail}>
                                    <p className={style.artworkName}>{item.artworkName}</p>
                                    <span className={style.description}>
                                        [ คำอธิบายงานจ้าง เช่น ของที่จะได้ วันมอบงาน ]
                                    </span>
                                </div>
                            </div>
                            <div className={style.price}>{formattedPrice(item.amount)} บาท</div>
                            <div className={style.quantity}>
                                <p>{item.quantity}</p>
                            </div>
                            <div className={style.netAmount}>{formattedPrice(item.netAmount)} บาท</div>
                        </div>
                    );
                })}
                <div className={`${style.amount} rounded-b-lg`}>
                    <div className={style.block}>
                        <span>คำสั่งซื้อ/จ้างทั้งหมด ({cartItems.length} ชิ้น)</span>
                        <span className={style.price}>{formattedPrice(totalAmount)} บาท</span>
                    </div>
                </div>
            </div>
        )
    );
};

export default ReviewCartOrderItem;
