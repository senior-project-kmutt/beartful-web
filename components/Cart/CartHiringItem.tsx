
import { HiringCarts } from "@/models/cart";
import style from "@/styles/cart/hiringCartItem.module.scss"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import CartQuotationHiringItem from "./CartQuotationHiringItem";
import { useEffect, useState } from "react";
import { IUser } from "@/pages/chat";
import { createChatRoom } from "@/services/chat/chat.api";

interface Props {
    item: HiringCarts
}

const CartHiringItem = (props: Props) => {
    const router = useRouter()
    const { item } = props
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        const user = localStorage.getItem("user") || "";
        if (user) {
            setUser(JSON.parse(user));
        }
    }, []);

    const handleGoToChat = () => {
        if (user) {
            const token = localStorage.getItem("auth");
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            const body = {
                paticipants: [
                    user.username,
                    item.freelanceUsername
                ]
            }
            createChatRoom(body, headers).then(res => {
                router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/chat?chatRoom=${res._id}`);
            })
        }
    }

    return (
        <div className={style.cartItem}>
            <div className={style.profile}>
                <FontAwesomeIcon icon={faUser} size="sm" style={{ marginTop: "4px" }}></FontAwesomeIcon>
                <p className={style.username}>{item.freelanceUsername}</p>
                <div className="ml-8">
                    <button className={style.saveButton} onClick={handleGoToChat}>แชท</button>
                    <button className={style.cancelButton} onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/user?username=${item.freelanceUsername}`)}>ดูโปรไฟล์</button>
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