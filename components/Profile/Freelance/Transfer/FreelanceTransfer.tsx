import ProfileSelectBarFreelance from "@/components/Profile/Freelance/ProfileSelectBar";
import FreelanceDashboard from "./FreelanceDashboard";
import HistoryTransaction from "./HistoryTransaction";
import style from "@/styles/profile/freelance/transfer/freelanceTransfer.module.scss"
import { useState } from "react";
import FreelanceWithdraw from "./FreelanceWithdraw";


const FreelanceTransfer = () => {
    const [slug, setSlug] = useState('dashboard')
    return (
        <>
            <div className="flex">
                <div style={{ width: '22%' }}>
                    <ProfileSelectBarFreelance activeMenu="transfer" />
                </div>
                <div className={style.container}>
                    {slug === 'dashboard' &&
                        <>
                            <FreelanceDashboard setSlug={setSlug} title='เงินในบัญชีของฉัน' />
                            <HistoryTransaction />
                        </>}
                    {slug === 'transfer' &&
                        <>
                            <FreelanceWithdraw setSlug={setSlug} title='ถอนเงินเข้าบัญชีธนาคารของฉัน' />
                        </>}
                </div>
            </div>
        </>
    );
};

export default FreelanceTransfer;