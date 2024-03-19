import NavBar from "@/components/Layout/NavBar";
import { useEffect, useState } from "react";
import { IUser } from "../chat";
import { useRouter } from "next/router";
import AdminManageUser from "@/components/Admin/AdminManageUser";


const Admin = () => {
    const [user, setUser] = useState<IUser>();
    const router = useRouter()

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user") || ""));
    }, []);

    useEffect(() => {
        router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/admin`)
    }, [user]);
    return (
        <>
            <NavBar />
            <AdminManageUser />
        </>
    );
};

export default Admin;
