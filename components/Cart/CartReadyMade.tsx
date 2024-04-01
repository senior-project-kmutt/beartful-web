import { Carts } from "@/models/cart";
import style from "@/styles/cart/readyMadeCartItem.module.scss"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartReadyMadeItem from "./CartReadyMadeItem";
import { useEffect, useState } from "react";
import { IUser } from "@/pages/chat";
import { createChatRoom } from "@/services/chat/chat.api";
import { useRouter } from "next/router";

interface Props {
    item: Carts,
}

const CartReadyMade = (props: Props) => {
    const { item } = props
    const router = useRouter();
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
        <div>
            <div className={style.cartItem}>
                <div className={style.profile}>
                    <FontAwesomeIcon icon={faUser} size="sm" style={{ marginTop: "4px" }}></FontAwesomeIcon>
                    <p className={style.username}>{item.freelanceUsername}</p>
                    <div className="ml-8">
                        <button className={style.chatButton} onClick={handleGoToChat}>แชท</button>
                        <button className={style.viewProfileButton} onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/user?username=${item.freelanceUsername}`)}>ดูโปรไฟล์</button>
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