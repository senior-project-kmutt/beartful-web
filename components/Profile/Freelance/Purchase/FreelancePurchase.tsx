
import style from "@/styles/profile/customer/purchase/customerPurchase.module.scss"

import NavBar from "@/components/Layout/NavBar";
import ProfileSelectBar from "@/components/Profile/Customer/ProfileSelectBar";
import PurchaseStatusBar from "../../Component/PurchaseStatusBar";
import { useState } from "react";
import PurchaseItem from "../../Component/PurchaseItem";

const CustomerPurchase = () => {
    const [status, setStatus] = useState<string>('ทั้งหมด')
    return (
        <>
            <NavBar />
            <div className="flex">

                <div className={style.sideBar}>
                    <ProfileSelectBar />
                </div>

                <div id="add_artwork" className={style.main}>
                    <div>การซื้อและการจ้างของฉัน</div>
                    <PurchaseStatusBar role="freelance" setStatus={setStatus} />
                    <PurchaseItem />
                    <PurchaseItem />
                    <PurchaseItem />
                    <PurchaseItem />
                    <PurchaseItem />
                    <PurchaseItem />
                </div>
            </div>
        </>
    );
};

export default CustomerPurchase;