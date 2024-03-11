import { formattedPrice } from "@/core/tranform";
import style from "@/styles/profile/freelance/transfer/freelanceTransfer.module.scss"
import { Dispatch, SetStateAction } from "react";


interface Props {
    title: string
    setSlug: Dispatch<SetStateAction<string>>;
}

const FreelanceDashboard = (props: Props) => {
    const { title, setSlug } = props
    return (
        <>
            <div className={style.main}>
                <h1 className="text-xl font-semibold mb-1">{title}</h1>
                <div className={style.dashboard}>
                    <div className={style.block1}>
                        <div className={style.blockLabel}>.</div>
                        <div className={style.group}>
                            <p className={style.balanceText}>My balance</p>
                            <p className={style.amount}>{formattedPrice(1500)} บาท</p>
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