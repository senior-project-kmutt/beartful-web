import { formattedPrice } from "@/core/tranform";
import { UserDashboard } from "@/models/users";
import style from "@/styles/profile/freelance/transfer/freelanceTransfer.module.scss"
import { Dispatch, SetStateAction } from "react";


interface Props {
    title: string;
    setSlug: Dispatch<SetStateAction<string>>;
    data: UserDashboard;
}

const FreelanceDashboard = (props: Props) => {
    const { title, setSlug, data } = props
    return (
        <>
            <div className={style.main}>
                <h1 className="text-xl font-semibold mb-1">{title}</h1>
                <div className={style.dashboard}>
                    <div className={style.block1}>
                        <div className={style.blockLabel}>.</div>
                        <div className={style.group}>
                            <p className={style.balanceText}>ยอดเงินคงเหลือ</p>
                            <p className={style.amount}>{formattedPrice(data.amount)} บาท</p>
                        </div>
                    </div>
                    <div className={style.block2}>
                        <button className={style.transfer} onClick={() => setSlug('transfer')}>ถอนเงิน</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FreelanceDashboard;