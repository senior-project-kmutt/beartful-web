import style from "@/styles/profile/freelance/transfer/freelanceTransfer.module.scss"
import TransactionItem from "./TransactionItem";
import { ITransaction } from "@/models/users";
import { useState } from "react";

interface Props {
    data: ITransaction[]
}

const HistoryTransaction = (props: Props) => {
    const { data } = props
    const [showAll, setShowAll] = useState(false);

    const limitedData = showAll ? data : data.slice(0, 5);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    return (
        <>
            <div className={style.main}>
                <div className={style.transaction}>
                    <div className={style.transaction_content}>
                        <p className={style.content1}>History Transactions</p>
                        {data.length > 5 && <p className={style.content2} onClick={toggleShowAll}>{showAll ? 'Show less' : 'Show more'}</p>}
                    </div>
                    {limitedData.map((item, index) => (
                        <TransactionItem key={index} data={item} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default HistoryTransaction;