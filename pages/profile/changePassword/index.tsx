import NavBar from "@/components/Layout/NavBar";
import ProfileSelectBar from "@/components/Profile/Freelance/ProfileSelectBar";

const ProfilePassword = () => {
  return (
    <>
      <NavBar />
      <div className="flex">
        <div>
          <ProfileSelectBar activeMenu="changePassword" />
        </div>
        <div className={`m-12`} style={{ width: '80%' }}>
          Coming Soon ...
        </div>
      </div>
    </>
  );
};

export default ProfilePassword;
