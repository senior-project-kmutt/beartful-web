import ProfileSelectBarFreelance from "@/components/Profile/Freelance/ProfileSelectBar";
import PersonalUpdateForm from "@/components/Profile/Freelance/Personal/PersonalUpdateForm";
import { useEffect, useState } from "react";
import { IUser } from "@/pages/chat";
import ProfileSelectBarCustomer from "@/components/Profile/Customer/ProfileSelectBar";


const ProfilePersonal = () => {
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
            <ProfileSelectBarFreelance activeMenu='personal' />
          </div>
        )}
        {user?.role === 'customer' && (
          <div className="fixed inset-0 bg-white z-3 mt-20" style={{ width: "22%" }}>
            <ProfileSelectBarCustomer activeMenu='personal' />
          </div>
        )}
        <div className="fixed mt-32 inset-0 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 32px)', zIndex: 20, marginLeft: "350px" }}>
          <PersonalUpdateForm />
        </div>
      </div>
    </>
  );
};

export default ProfilePersonal;
