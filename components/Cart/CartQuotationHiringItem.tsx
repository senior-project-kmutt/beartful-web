
import { Quotation } from "@/models/quotation";
import style from "@/styles/cart/hiringCartItem.module.scss"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

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

    return (
        <div className={style.cartItem}>
            <div className={style.formGrid}>
                <div className={style.information}>
                    <img className={style.userImage} src="../../xxxx"></img>
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
                    <FontAwesomeIcon icon={faTrash} style={{ color: '#5A2810' }} size="2xl"></FontAwesomeIcon>
                </div>
            </div>
        </div>

    );
};

export default CartQuotationHiringItem;