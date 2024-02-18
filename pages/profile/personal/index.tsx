import NavBar from "@/components/Layout/NavBar";
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
      <NavBar />
      <div className="flex">
        {user?.role === 'freelance' && (
          <div style={{width: "18%"}}>
            <ProfileSelectBarFreelance activeMenu="personal" />
          </div>
        )}
        {user?.role === 'customer' && (
          <div style={{width: "18%"}}>
            <ProfileSelectBarCustomer activeMenu="personal" />
          </div>
        )}
        <div className={`m-12`} style={{ width: '80%' }}>
          <PersonalUpdateForm />
        </div>
      </div>
    </>
  );
};

export default ProfilePersonal;
