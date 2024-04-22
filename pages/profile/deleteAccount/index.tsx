import DeleteAccountComponent from "@/components/Profile/Component/DeleteAccountComponent";
import ProfileSelectBarCustomer from "@/components/Profile/Customer/ProfileSelectBar";
import ProfileSelectBarFreelance from "@/components/Profile/Freelance/ProfileSelectBar";
import { IUser } from "@/pages/chat";
import { useEffect, useState } from "react";

const DeleteAccount = () => {
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        const user: IUser = JSON.parse(localStorage.getItem('user') || '');
        setUser(user);
    }, []);

    return (
        <>
            <div className="flex mt-16">
                {user?.role === 'freelance' && (
                    <div style={{ width: "22%" }}>
                        <ProfileSelectBarFreelance activeMenu="deleteAccount" />
                    </div>
                )}
                {user?.role === 'customer' && (
                    <div style={{ width: "22%" }}>
                        <ProfileSelectBarCustomer activeMenu="deleteAccount" />
                    </div>
                )}
                <div className={`m-12`} style={{ width: '80%' }}>
                    {user && (
                        <>
                            <DeleteAccountComponent userId={user?.id} />
                        </>
                    )}
                </div>
            </div>
        </>
    )
};

export default DeleteAccount;
