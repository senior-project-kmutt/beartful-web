
import { READYMADE_IMAGE } from "@/config/constants";
import { CartItem } from "@/models/cart";
import { deleteCartById } from "@/services/cart/cart.api";
import style from "@/styles/cart/hiringCartItem.module.scss"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

interface Props {
    item: CartItem
}

const CartReadyMadeItem = (props: Props) => {
    const router = useRouter()
    const { item } = props

    const deleteItem = () => {
        Swal.fire({
            title: `ยืนยันการลบสินค้าออกจากตะกร้า`,
            text: `${item.artworkName}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ยืนยัน",
            cancelButtonText: "ยกเลิก"
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("auth");
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                deleteCartById(item._id, headers).subscribe(res => {
                    Swal.fire({
                        icon: "success",
                        title: "ลบสำเร็จ",
                        showConfirmButton: false,
                        timer: 1500
                    }).then((result) => {
                        if (result.isConfirmed || result.isDismissed) {
                            router.reload()
                        }
                    });
                })
            }
        });
    }
    return (
        <div className={style.cartItem}>
            <div className={style.formGrid}>
                <div className={style.information}>
                    <img className={style.userImage} src={READYMADE_IMAGE}></img>
                    <div className={style.detail}>
                        <p className={style.artworkName}>{item.artworkName}</p>
                        <p className={style.description}>{item.description}</p>
                    </div>
                </div>
                <div className={style.price}>{item.amount} Baht</div>
                <div className={style.confirm}>
                    <button className={style.confirmButton} onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/cart/review-order-readyMade?item=${item._id}`)}>จัดจ้าง</button>
                    <FontAwesomeIcon icon={faTrash} style={{ color: '#5A2810', cursor: 'pointer' }} size="xl" onClick={() => deleteItem()}></FontAwesomeIcon>
                </div>
            </div>
        </div>

    );
};

export default CartReadyMadeItem;