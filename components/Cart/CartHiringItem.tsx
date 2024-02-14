
import { Carts, HiringCarts } from "@/models/cart";
import style from "@/styles/cart/hiringCartItem.module.scss"
import { faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    item: HiringCarts
}

const CartHiringItem = (props: Props) => {
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
            <div className={style.profile}>
                <FontAwesomeIcon icon={faUser} size="sm" style={{ marginTop: "4px" }}></FontAwesomeIcon>
                <p className={style.username}>{item.freelanceUsername}</p>
                <div className="ml-8">
                    <button className={style.saveButton}>Chat</button>
                    <button className={style.cancelButton}>View profile</button>
                </div>
            </div>
            {item.cartItem.map((item, index) => {
                return (
                    <div className={style.formGrid} key={index}>
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