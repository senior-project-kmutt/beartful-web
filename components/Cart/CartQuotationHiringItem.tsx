
import { HIRED_IMAGE } from "@/config/constants";
import { Quotation } from "@/models/quotation";
import { deleteQuotationById } from "@/services/quotation/quotation.api";
import style from "@/styles/cart/hiringCartItem.module.scss"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

interface Props {
    item: Quotation
}

const CartQuotationHiringItem = (props: Props) => {
    const router = useRouter()
    const { item } = props

    const getDateFormat = (dateTime: Date) => {
        const dateObject = new Date(dateTime);
        const date = dateObject.getDate().toString().padStart(2, '0');
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getFullYear();
        return `${date}/${month}/${year}`;
    }

    const deleteItem = () => {
        Swal.fire({
            title: `ยืนยันยกเลิกการจัดจ้าง`,
            text: `${item.name}`,
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
                deleteQuotationById(item._id, headers).then(res => {
                    Swal.fire({
                        icon: "success",
                        title: "ยกเลิกการจัดจ้่างสำเร็จ",
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
                    <img className={style.userImage} src={HIRED_IMAGE}></img>
                    <div className={style.detail}>
                        <p className={style.artworkName}>{item.name}</p>
                        <p className={style.description}>เลขที่ : {item.quotationNumber}</p>
                        <p className={style.description}>สิ่งที่ได้รับ : {item.benefits}</p>
                        <p className={style.description}>การแก้ไข : {item.numberOfEdit}</p>
                        <p className={style.description}>ระยะเวลาการทำงาน : {getDateFormat(item.startDate)} - {getDateFormat(item.endDate)}</p>
                        {item.note && (
                            <p className={style.description}>หมายเหตุเพิ่มเติม : {item.note}</p>
                        )}
                    </div>
                </div>
                <div className={style.price}>{item.amount} Baht</div>
                <div className={style.confirm}>
                    <button className={style.confirmButton} onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/cart/review-order-hiring?item=${item._id}`)}>จัดจ้าง</button>
                    <FontAwesomeIcon icon={faTrash} style={{ color: '#5A2810', cursor: 'pointer' }} size="xl" onClick={() => deleteItem()}></FontAwesomeIcon>
                </div>
            </div>
        </div>

    );
};

export default CartQuotationHiringItem;