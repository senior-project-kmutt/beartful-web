import Freelance from "@/components/Profile/FreelanceProfile";
import { useEffect, useState } from "react";
import { IUser } from "../chat";
{/* เช็คใน storage ว่าที่ login ตอนนี้ role อะไร แบ่งแต่ละ role ไปตามแต่ละ component */ }
const Profile = () => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const user: IUser = JSON.parse(localStorage.getItem('user') || '');
    setUsername(user.username)
  }, []);

  return (
    <>
      {username && (
        <Freelance username={username} isProfileEditMode={true} />
      )}
    </>
  );
};

export default Profile;
