import { CartItem, Carts } from "@/models/cart";
import { IUser } from "@/pages/chat";
import { editCartById } from "@/services/cart/cart.api";
import style from "@/styles/cart/readyMadeCartItem.module.scss"
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

interface Props {
    data: Carts
}

const CartReadyMadeItem = (props: Props) => {
    const { data } = props

    const [user, setUser] = useState<IUser>();
    const [cartItems, setCartItems] = useState<CartItem[]>(data.cartItem);

    useEffect(() => {
        setCartItems(data.cartItem);
        setUser(JSON.parse(localStorage.getItem("user") || ""));
    }, [data.cartItem]);

    const editCartItem = async (cartId: string, quantity: number) => {
        const token = localStorage.getItem("auth");
        if (token) {
            if (user) {
                const cart = { quantity: quantity };
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                try {
                    await editCartById(cartId, cart, headers);
                } catch (error) {
                    console.error("Error edit artwork:", error);
                }
            }
        }
    }

    const handleQuantityChange = (itemId: string, operation: string, amount: number, quantity?: number) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item._id === itemId) {
                if (operation === 'increment') {
                    editCartItem(itemId, item.quantity + 1)
                    return { ...item, quantity: +item.quantity + 1, netAmount: amount * (+item.quantity + 1) };
                } else if (operation === 'decrement') {
                    editCartItem(itemId, item.quantity - 1)
                    return { ...item, quantity: +item.quantity - 1, netAmount: amount * (+item.quantity - 1) };
                } else if (operation === 'inputChange') {
                    const newQuantity = quantity || 0;
                    editCartItem(itemId, newQuantity)
                    return { ...item, quantity: newQuantity, netAmount: amount * newQuantity };
                }
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };


    return (
        <div className={style.cartItem}>
            <div className={style.profile}>
                <FontAwesomeIcon icon={faUser} size="sm" style={{ marginTop: "4px" }}></FontAwesomeIcon>
                <p className={style.username}>{data.freelanceUsername}</p>
                <div className="ml-8">
                    <button className={style.saveButton}>Chat</button>
                    <button className={style.cancelButton}>View profile</button>
                </div>
            </div>
            {cartItems.map((item) => {
                return (
                    <div className={style.order}>
                        <img className={style.userImage} src="../../xxxx"></img>
                        <div className={style.detail}>
                            <p className={style.artworkName}>{item.artworkName}</p>
                            <span className={style.description}>[  คำอธิบายงานจ้าง เช่น ของที่จะได้ วันมอบงาน  ]</span>
                        </div>
                        <div className={style.price}>{item.amount} Baht</div>
                        <div className={style.quantity}>
                            <button onClick={() => handleQuantityChange(item._id, 'decrement', item.amount)}>-</button>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(event) => handleQuantityChange(item._id, 'inputChange', item.amount, parseInt(event.target.value))}
                            />
                            <button onClick={() => handleQuantityChange(item._id, 'increment', item.amount)}>+</button>
                        </div>
                        <div className={style.netAmount}>{item.netAmount} Baht</div>
                        <div className={style.confirm}>
                            <FontAwesomeIcon icon={faTrash} style={{ color: '#5A2810' }} size="2xl"></FontAwesomeIcon>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default CartReadyMadeItem;