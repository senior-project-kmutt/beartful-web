import style from "@/styles/profile/freelance/transfer/freelanceTransfer.module.scss"
import TransactionItem from "./TransactionItem";

const HistoryTransaction = () => {
    return (
        <>
            <div id="add_artwork" className={style.main}>
                <div className={style.transaction}>
                    <div className={style.transaction_content}>
                        <p className={style.content1}>History Transactions</p>
                        <p className={style.content2}>Show more</p>
                    </div>
                    <TransactionItem />
                    <TransactionItem />
                    <TransactionItem />
                    <TransactionItem />
                </div>
            </div>
        </>
    );
};

export default HistoryTransaction;