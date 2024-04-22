import ProfileSelectBarFreelance from "@/components/Profile/Freelance/ProfileSelectBar";
import FreelanceDashboard from "./FreelanceDashboard";
import HistoryTransaction from "./HistoryTransaction";
import style from "@/styles/profile/freelance/transfer/freelanceTransfer.module.scss";
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
                <div className="fixed inset-0 bg-white z-3 mt-20 sm:w-1/4 lg:w-1/5 xl:w-1/6">
                    <ProfileSelectBarFreelance activeMenu='transfer' />
                </div>
                {data && <div className={`${style.container} fixed mt-32 inset-0 overflow-y-auto mr-12`} style={{ maxHeight: 'calc(100vh - 32px)', zIndex: 20, marginLeft: "350px" }}>
                    {slug === 'dashboard' &&
                        <>
                            <FreelanceDashboard setSlug={setSlug} data={data} title='เงินในบัญชีของฉัน' />
                            <HistoryTransaction data={data.transaction} dashboard={data} />
                        </>}
                    {slug === 'transfer' &&
                        <>
                            <FreelanceWithdraw setSlug={setSlug} data={data} user={user} title='ถอนเงินเข้าบัญชีธนาคารของฉัน' />
                        </>}
                </div>}

            </div>
        </>
    );
};

export default FreelanceTransfer;