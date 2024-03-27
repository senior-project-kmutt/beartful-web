import style from "@/styles/profile/freelance/transfer/freelanceTransfer.module.scss"
import TransactionItem from "./TransactionItem";
import { ITransaction, UserDashboard } from "@/models/users";
import { useState } from "react";
import FreelanceDetailModal from "./FreelanceDetailModal";

interface Props {
    data: ITransaction[]
    dashboard: UserDashboard
}

const HistoryTransaction = (props: Props) => {
    const { data, dashboard } = props
    const [showAll, setShowAll] = useState(false);
    const [openDetailModal, setOpenDetailModal] = useState<boolean>(false)
    const limitedData = showAll ? data : data.slice(0, 5);
    const [item, setItem] = useState<ITransaction>();

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const toggleDetailModal = (itemTransaction: ITransaction) => {
        setItem(itemTransaction)
        setOpenDetailModal(true);
    };

    return (
        <>
            <div className={style.main}>
                <div className={style.transaction}>
                    <div className={style.transaction_content}>
                        <p className={style.content1}>ประวัติเงินเข้า-ออก</p>
                        {data.length > 5 && <p className={style.content2} onClick={toggleShowAll}>{showAll ? 'แสดงน้อยลง' : 'แสดงเพิ่มเติม'}</p>}
                    </div>
                    {limitedData.map((item, index) => (
                        <div key={index} onClick={() => toggleDetailModal(item)}>
                            {/* {openDetailModal && <FreelanceDetailModal setOpenDetailModal={setOpenDetailModal} data={item} />} */}
                            <TransactionItem key={index} data={item} />
                        </div>
                    ))}
                </div>
            </div>
            {(openDetailModal && item) && <FreelanceDetailModal setOpenDetailModal={setOpenDetailModal} data={item} dashboard={dashboard} />}
        </>
    );
};

export default HistoryTransaction;