import { useEffect, useState } from "react";
import { IUser } from "../../chat";
import ProfileSelectBarFreelance from "@/components/Profile/Freelance/ProfileSelectBar";
import style from '@/styles/profile/freelance/additional/additionForm.module.scss'
import { getUserById, updateFreelanceDetails } from "@/services/user/user.api";
import Swal from "sweetalert2";
import EducationForm, { EducationItem } from "@/components/Authentication/FormRegister/EducationForm";
import ExperienceForm, { ExperienceItem } from "@/components/Authentication/FormRegister/ExperienceForm";
import SkillLanguageForm, { SkillAndLanguageItem } from "@/components/Authentication/FormRegister/SkillLanguageForm";
import AwardForm, { AwardItem } from "@/components/Authentication/FormRegister/AwardForm";

const ProfileBankAccount = () => {
  const [user, setUser] = useState<IUser>();

  // original data
  const [educationInfo, setEducationInfo] = useState<EducationItem[]>();
  const [experienceInfo, setExperienceInfo] = useState<ExperienceItem[]>();
  const [skillAndLanguageInfo, setSkillAndLanguageInfo] = useState<SkillAndLanguageItem[]>();
  const [awardInfo, setAwardInfo] = useState<AwardItem[]>();

  // formData
  const [formEducation, setFormEducation] = useState<EducationItem[]>([
    {
      degree: '',
      institution: '',
      major: ''
    },
  ])
  const [formExperience, setFormExperience] = useState<ExperienceItem[]>([]);
  const [formSkillAndLanguage, setFormSkillAndLanguage] = useState<SkillAndLanguageItem[]>([]);
  const [formAward, setFormAward] = useState<AwardItem[]>([]);

  // for check form valid
  const [isFormEducationlValid, setIsFormEducationValid] = useState<boolean>(false)
  const [isFormExperiencelValid, setIsFormExperienceValid] = useState<boolean>(false)
  const [isFormSkillAndLanguageValid, setIsFormSkillAndLanguageValid] = useState<boolean>(false)
  const [isFormAwardValid, setIsFormAwardValid] = useState<boolean>(false)
  const [isSaveForm, setIsSaveForm] = useState<boolean>(false)

  useEffect(() => {
    const user: IUser = JSON.parse(localStorage.getItem('user') || '');
    setUser(user);
  }, []);

  useEffect(() => {
    getFreelanceDetailsInfo();
  }, [user]);

  useEffect(() => {
    if (isFormEducationlValid && isFormExperiencelValid && isFormSkillAndLanguageValid && isFormAwardValid) {
      handleSubmitForm();
    }
    setIsSaveForm(false)
  }, [isSaveForm, isFormEducationlValid, isFormExperiencelValid, isFormSkillAndLanguageValid, isFormAwardValid]);

  const getFreelanceDetailsInfo = () => {
    const headers = getHeaderRequest();
    if (user) {
      getUserById(user.id, headers).then((res) => {
        setFormEducation(res.education);
        setEducationInfo(res.education);
        setFormExperience(res.experience);
        setExperienceInfo(res.experience);
        const data = [
          ...res.skill,
          ...res.language
        ]
        setFormSkillAndLanguage(data);
        setSkillAndLanguageInfo(data);
        setFormAward(res.award);
        setAwardInfo(res.award);
      })
        .catch(error => console.log(error));
    }
  }

  //ใช้ไม่ได้
  const checkDataIsChange = () => {
    if (educationInfo) {
      for (let index = 0; index < formEducation.length; index++) {
        const formItem: any = formEducation[index];
        const infoItem: any = educationInfo[index];

        for (const key in formItem) {
          if (formItem[key] !== infoItem[key]) {
            return true;
          }
        }
      }
      return false;
    }
  };


  const handleSubmitForm = () => {
    if (user) {
      const skill = formSkillAndLanguage.filter(item => item.type === 'skill');
      const language = formSkillAndLanguage.filter(item => item.type === 'language');
      const formSubmitData = {
        education: [...formEducation],
        experience: [...formExperience],
        skill: skill,
        language: language,
        award: [...formAward]
      }
      const headers = getHeaderRequest();
      updateFreelanceDetails(user.id, formSubmitData, headers).then((res) => {
        Swal.fire({
          icon: "success",
          title: "แก้ไขข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 1500
        })
      }).catch(error => {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "โปรดลองใหม่อีกครั้ง",
          icon: "error"
        });
      });
    }
  }

  const getHeaderRequest = () => {
    const token = localStorage.getItem('auth');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return headers
  }

  return (
    <>
      <div className="flex mt-16">
        <div className="fixed inset-0 bg-white z-3 mt-20 sm:w-1/4 lg:w-1/5 xl:w-1/6">
          <ProfileSelectBarFreelance activeMenu='freelanceDetails' />
        </div>

        <div className="fixed mt-32 inset-0 overflow-y-auto mr-12" style={{ maxHeight: 'calc(100vh - 32px)', zIndex: 20, marginLeft: "350px" }}>
          <div className='mb-8'>
            <EducationForm
              defaultFormData={formEducation}
              saveFormRegister={setFormEducation}
              setIsFormValid={setIsFormEducationValid}
              isHideButton={true}
              isSaveForm={isSaveForm}
            />
          </div>

          <div className='mb-8'>
            <ExperienceForm
              defaultFormData={formExperience}
              saveFormRegister={setFormExperience}
              setIsFormValid={setIsFormExperienceValid}
              isHideButton={true}
              isSaveForm={isSaveForm}
            />
          </div>

          <div className='mb-8'>
            <SkillLanguageForm
              defaultFormData={formSkillAndLanguage}
              saveFormRegister={setFormSkillAndLanguage}
              setIsFormValid={setIsFormSkillAndLanguageValid}
              isHideButton={true}
              isSaveForm={isSaveForm}
            />
          </div>

          <div className='mb-8'>
            <AwardForm
              defaultFormData={formAward}
              saveFormRegister={setFormAward}
              setIsFormValid={setIsFormAwardValid}
              isHideButton={true}
              isSaveForm={isSaveForm}
            />
          </div>
          <div>
            <div className={style.button}>
              <div className="flex justify-center">
                <button className={style.submit} onClick={() => setIsSaveForm(true)}>
                  บันทึก
                </button>
                <button className={style.cancel}>ยกเลิก</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileBankAccount;
