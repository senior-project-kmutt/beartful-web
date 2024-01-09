import Freelance from "@/components/Profile/FreelanceProfile";

const Profile: React.FC = () => {
  return (
    <>
      {/* เช็คใน storage ว่าที่ login ตอนนี้ role อะไร แบ่งแต่ละ role ไปตามแต่ละ component */}
      <Freelance />
    </>
  );
};

export default Profile;
