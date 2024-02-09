import NavBar from "@/components/Layout/NavBar";
import ProfileSelectBar from "@/components/Profile/Freelance/ProfileSelectBar";
import style from '@/styles/profile/freelance/personal/personalForm.module.scss'
import PersonalUpdateForm from "@/components/Profile/Freelance/Personal/PersonalUpdateForm";

interface formDataType {
  [key: string]: any;
}


const ProfilePersonal = () => {
  return (
    <>
      <NavBar />
      <div className="flex">
        <div className={style.sideBar}>
          <ProfileSelectBar />
        </div>
        <div className={`my-12`} style={{ width: '80%' }}>
          <PersonalUpdateForm />
        </div>
      </div>
    </>
  );
};

export default ProfilePersonal;
