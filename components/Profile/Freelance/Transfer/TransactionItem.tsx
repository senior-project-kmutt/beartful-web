import style from "@/styles/profile/freelance/transfer/freelanceTransfer.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown, faCircleDollarToSlot } from "@fortawesome/free-solid-svg-icons";
import { formattedPrice } from "@/core/tranform";


const TransactionItem = () => {

    return (
        <div className={style.transaction_item}>
            <div className={style.icon}>
                <div className={style.rectangle}>
                    <FontAwesomeIcon icon={faCircleDollarToSlot} size="2xl" style={{ color: '#E16428' }} />
                    <FontAwesomeIcon icon={faCircleArrowDown} size="2xl" style={{ color: '#E16428' }} />
                </div>
                <div className="flex w-25 justify-between">
                    <div>
                        <p className={style.description}> customer name</p>
                        <p className={style.date}> 05/02/2024</p>
                    </div>
                    <div className={style.price}>
                        <p className={style.priceText}>{formattedPrice(1500)} บาท</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionItem;