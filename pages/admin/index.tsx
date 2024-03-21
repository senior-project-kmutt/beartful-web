import NavBar from "@/components/Layout/NavBar";
import { useEffect, useState } from "react";
import { IUser } from "../chat";
import { useRouter } from "next/router";
import AdminManageUser from "@/components/Admin/AdminManageUser";
const Admin = () => {
    const [user, setUser] = useState<IUser>();
    const router = useRouter()

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    return (
        <>
            {user && user.role === 'admin' && <> <NavBar />
                <AdminManageUser /></>}
        </>
    );
};

export default Admin;
