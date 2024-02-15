import NavBar from "@/components/Layout/NavBar";
import { useEffect, useState } from "react";
import { IUser } from "../chat";
import { useRouter } from "next/router";


const Profile = () => {
    const [user, setUser] = useState<IUser>();
    const router = useRouter()

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user") || ""));
    }, []);

    useEffect(() => {
        router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile/personal`)
    }, [user]);
    return (
        <>
            <NavBar />
            {/* เช็คว่าเป็น role ไหนแล้วเลือกไปตาม role ถ้าเป็น customer หน้าแรกเป็นบัญชีของฉัน=>ข้อมูลของฉัน freelance หน้าแรกเป็นบัญชีของฉัน ประวัติ */}
        </>
    );
};

export default Profile;
