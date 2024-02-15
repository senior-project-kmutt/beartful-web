import NavBar from "@/components/Layout/NavBar";
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
          <div>
            <ProfileSelectBarFreelance activeMenu="changePassword" />
          </div>
        )}
        {user?.role === 'customer' && (
          <div>
            <ProfileSelectBarCustomer activeMenu="changePassword" />
          </div>
        )}
        <div className={`m-12`} style={{ width: '80%' }}>
          Coming Soon ...
        </div>
      </div>
    </>
  );
};

export default ProfilePassword;
