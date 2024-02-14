import CustomerPurchase from "@/components/Profile/Customer/Purchase/CustomerPurchase";
import FreelancePurchase from "@/components/Profile/Freelance/Purchase/FreelancePurchase";
import { IUser } from "@/pages/chat";
import { useEffect, useState } from "react";

const Purchase = () => {
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        const user: IUser = JSON.parse(localStorage.getItem('user') || '');
        setUser(user);
    }, []);

    return (
        <div>
            {user && <>{user?.role === "freelance" ? <FreelancePurchase user={user} /> : <CustomerPurchase user={user} />}</ >}
        </div>
    );
};

export default Purchase;
