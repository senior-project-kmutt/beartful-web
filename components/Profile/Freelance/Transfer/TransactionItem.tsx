import style from "@/styles/profile/freelance/transfer/freelanceTransfer.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown, faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { formatDateTime, formattedPrice } from "@/core/tranform";
import { ITransaction } from "@/models/users";

interface Props {
    data: ITransaction
}

const TransactionItem = (props: Props) => {
    const { data } = props

    return (
        <div className={style.transaction_item}>
            <div className={style.icon}>
                <div className={style.rectangle}>
                    <FontAwesomeIcon icon={data.type === 'paid' ? faCircleArrowDown : faCircleDollarToSlot} size="2xl" style={{ color: '#E16428' }} />
                </div>
                <div className="flex w-25 justify-between">
                    <div>
                        <p className={style.description}>{data.type == 'paid' ? 'รายการเงินเข้า' : 'รายการถอนเงิน'}</p>
                        <p className={style.date}>{formatDateTime(data.createdAt)}</p>
                    </div>
                    <div className={style.price}>
                        <p className={style.priceText}>{formattedPrice(data.amount)} บาท</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionItem;