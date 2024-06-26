import { formattedPrice } from "@/core/tranform";
import { CartItem, Carts } from "@/models/cart";
import { IUser } from "@/pages/chat";
import { deleteCartById, editCartById } from "@/services/cart/cart.api";
import style from "@/styles/cart/readyMadeCartItem.module.scss"
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
    data: Carts,
    updateCartWhenItemUpdated: (cartItem: CartItem) => void;
}

const CartReadyMadeItem = (props: Props) => {
    const { data, updateCartWhenItemUpdated } = props

    const [user, setUser] = useState<IUser>();
    const [cartItems, setCartItems] = useState<CartItem[]>(data.cartItem);
    const router = useRouter();

    useEffect(() => {
        setCartItems(data.cartItem);
        setUser(JSON.parse(localStorage.getItem("user") || ""));
    }, [data.cartItem]);

    const editCartItem = async (cartId: string, quantity: number, checked: boolean) => {
        const token = localStorage.getItem("auth");
        if (token) {
            if (user) {
                const cart = { quantity: quantity, checked: checked };
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
                    editCartItem(itemId, item.quantity + 1, item.checked)
                    updateCartWhenItemUpdated({ ...item, quantity: +item.quantity + 1, netAmount: amount * (+item.quantity + 1) })
                    return { ...item, quantity: +item.quantity + 1, netAmount: amount * (+item.quantity + 1) };
                } else if (operation === 'decrement') {
                    editCartItem(itemId, item.quantity - 1, item.checked)
                    updateCartWhenItemUpdated({ ...item, quantity: +item.quantity - 1, netAmount: amount * (+item.quantity - 1) })
                    return { ...item, quantity: +item.quantity - 1, netAmount: amount * (+item.quantity - 1) };
                } else if (operation === 'inputChange') {
                    const newQuantity = quantity || 0;
                    editCartItem(itemId, newQuantity, item.checked)
                    updateCartWhenItemUpdated({ ...item, quantity: newQuantity, netAmount: amount * newQuantity })
                    return { ...item, quantity: newQuantity, netAmount: amount * newQuantity };
                }
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const handleCheck = (itemId: string) => {
        const updatedCartItems = cartItems.map((item) => {
            if (item._id === itemId) {
                editCartItem(itemId, item.quantity, !item.checked);
                updateCartWhenItemUpdated({ ...item, checked: !item.checked })
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setCartItems(updatedCartItems);
    };

    const deleteCart = async (cartId: string) => {
        const token = localStorage.getItem("auth");
        if (token) {
            if (user) {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                try {
                    await deleteCartById(cartId, headers);
                    const updatedCartItems = cartItems.filter((item) => item._id !== cartId);
                    setCartItems(updatedCartItems);
                } catch (error) {
                    console.error("Error delete cart:", error);
                }
            }
        }
    }

    const checkHasFreelanceInCart = () => {
        return cartItems.some(item => item.freelanceId === data.freelanceId)
    }

    return (
        checkHasFreelanceInCart() && (
            <div className={style.cartItem}>
                <div className={style.profile}>
                    <FontAwesomeIcon icon={faUser} size="sm" style={{ marginTop: "4px" }}></FontAwesomeIcon>
                    <p className={style.username}>{data.freelanceUsername}</p>
                    <div className="ml-8">
                        <button className={style.saveButton}>แชท</button>
                        <button className={style.cancelButton} onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/user?username=${data.freelanceUsername}`)}>ดูโปรไฟล์</button>
                    </div>
                </div>
                {cartItems.map((item, index) => {
                    return (
                        <div className={style.formGrid} key={index} >
                            <div className={style.information}>
                                <input type="checkbox" className={style.check} checked={item.checked} onClick={() => handleCheck(item._id)} />
                                <img className={style.userImage} src="../../xxxx"></img>
                                <div className={style.detail}>
                                    <p className={style.artworkName}>{item.artworkName}</p>
                                    <span className={style.description}>[  คำอธิบายงานจ้าง เช่น ของที่จะได้ วันมอบงาน  ]</span>
                                </div>
                            </div>
                            <div className={style.price}>{formattedPrice(item.amount)} บาท </div>
                            <div className={style.quantity}>
                                <button onClick={() => handleQuantityChange(item._id, 'decrement', item.amount)}>-</button>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(event) => handleQuantityChange(item._id, 'inputChange', item.amount, parseInt(event.target.value))}
                                />
                                <button onClick={() => handleQuantityChange(item._id, 'increment', item.amount)}>+</button>
                            </div>
                            <div className={style.netAmount}>{formattedPrice(item.netAmount)} บาท</div>
                            <div className={style.confirm}>
                                <FontAwesomeIcon icon={faTrash} style={{ color: '#5A2810' }} size="2xl" onClick={() => deleteCart(item._id)}></FontAwesomeIcon>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    );
};

export default CartReadyMadeItem;