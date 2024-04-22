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
      <div className="flex mt-16">
        {user?.role === 'freelance' && (
          <div className="fixed inset-0 bg-white z-3 mt-20" style={{ width: "22%" }}>
          <ProfileSelectBarFreelance activeMenu='changePassword' />
        </div>
        )}
        {user?.role === 'customer' && (
         <div className="fixed inset-0 bg-white z-3 mt-20" style={{ width: "22%" }}>
         <ProfileSelectBarCustomer activeMenu='changePassword' />
       </div>
        )}
        {user && (
          <div className="fixed mt-32 inset-0 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 32px)', zIndex: 20, marginLeft: "350px" }}>
            <ChangePassword userId={user?.id}></ChangePassword>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePassword;
