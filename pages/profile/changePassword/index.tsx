import NavBar from "@/components/Layout/NavBar";
import ChangePassword from "@/components/Profile/Component/ChangePassword";
import ProfileSelectBarCustomer from "@/components/Profile/Customer/ProfileSelectBar";
import ProfileSelectBarFreelance from "@/components/Profile/Freelance/ProfileSelectBar";
import { IUser } from "@/pages/chat";
import { useEffect, useState } from "react";

const ProfilePassword = () => {
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    const user = localStorage.getItem("user") || "";
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  return (
    <>
      <NavBar />
      <div className="flex">
        {user?.role === 'freelance' && (
          <div style={{ width: "18%" }}>
            <ProfileSelectBarFreelance activeMenu="changePassword" />
          </div>
        )}
        {user?.role === 'customer' && (
          <div style={{ width: "18%" }}>
            <ProfileSelectBarCustomer activeMenu="changePassword" />
          </div>
        )}
        {user && (
          <div className={`m-12`} style={{ width: '80%' }}>
            <ChangePassword userId={user?.id}></ChangePassword>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePassword;
