import ProfileSelectBarFreelance from "@/components/Profile/Freelance/ProfileSelectBar";
import FreelanceDashboard from "./FreelanceDashboard";
import HistoryTransaction from "./HistoryTransaction";
import style from "@/styles/profile/freelance/transfer/freelanceTransfer.module.scss"
import { useEffect, useState } from "react";
import FreelanceWithdraw from "./FreelanceWithdraw";
import { IUser } from "@/pages/chat";
import { getFreelanceDashboardById } from "@/services/user/user.api";
import { UserDashboard } from "@/models/users";


const FreelanceTransfer = () => {
    const [slug, setSlug] = useState('dashboard')
    const [user, setUser] = useState<IUser>();
    const [data, setData] = useState<UserDashboard>()

    useEffect(() => {
        const user: IUser = JSON.parse(localStorage.getItem('user') || '');
        setUser(user);
    }, []);

    useEffect(() => {
        getDashboardData();
    }, [user]);

    const getDashboardData = () => {
        const headers = getHeaderRequest();
        if (user) {
            getFreelanceDashboardById(user.id, headers).then((res) => {
                console.log(res);
                setData(res);

            }).catch(error => console.log(error));
        }
    }

    const getHeaderRequest = () => {
        const token = localStorage.getItem('auth');
        const headers = {
            Authorization: `Bearer ${token}`
        };
        return headers
    }

    return (
        <>
            <div className="flex">
                <div style={{ width: '22%' }}>
                    <ProfileSelectBarFreelance activeMenu="transfer" />
                </div>
                {data && <div className={style.container}>
                    {slug === 'dashboard' &&
                        <>
                            <FreelanceDashboard setSlug={setSlug} data={data} title='เงินในบัญชีของฉัน' />
                            <HistoryTransaction data={data.transaction} />
                        </>}
                    {slug === 'transfer' &&
                        <>
                            <FreelanceWithdraw setSlug={setSlug} data={data} title='ถอนเงินเข้าบัญชีธนาคารของฉัน' />
                        </>}
                </div>}

            </div>
        </>
    );
};

export default FreelanceTransfer;

function getHeaderRequest() {
    throw new Error("Function not implemented.");
}
