import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PersonalForm from "./FormRegister/PersonalForm";
import { Process } from "./Register";
import EducationForm, { EducationItem } from "./FormRegister/EducationForm";
import ExperienceForm, { ExperienceItem } from "./FormRegister/ExperienceForm";
import SkillLanguageForm, { SkillAndLanguageItem } from "./FormRegister/SkillLanguageForm";
import AwardForm, { AwardItem } from "./FormRegister/AwardForm";
import AccountingForm from "./FormRegister/AccountingForm";
import Swal from "sweetalert2";
import { createUser } from "@/services/user/user.api";
import { FreelanceUsers } from "@/models/users";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";
import { defaultProfileImage } from "@/config/constants";
import { uploadFileToFirebase } from "@/services/firebase/firebase-api";

interface Props {
  roleSelected: string;
  setRoleSelected: Dispatch<SetStateAction<string>>
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>
  process: Process[];
  setProcess: Dispatch<SetStateAction<Process[]>>
}
const RegisterFreelance = (props: Props) => {
  const router = useRouter();
  const { roleSelected, setRoleSelected, activeMenu, setActiveMenu, process, setProcess } = props
  const [formPersonal, setFormPersonal] = useState<any>()
  const [formEducation, setFormEducation] = useState<EducationItem[]>([
    {
      degree: '',
      institution: '',
      major: ''
    },
  ])
  const [formExperience, setFormExperience] = useState<ExperienceItem[]>([])
  const [formSkillAndLanguage, setFormSkillAndLanguage] = useState<SkillAndLanguageItem[]>([])
  const [formAward, setFormAward] = useState<AwardItem[]>([])
  const [formBankAccount, setFormBankAccount] = useState<any>()
  const [isFormPersonalValid, setIsFormPersonalValid] = useState<boolean>(false)
  const [isFormEducationlValid, setIsFormEducationValid] = useState<boolean>(false)
  const [isFormExperienceSave, setIsFormExperienceSave] = useState<boolean>(false)
  const [isFormSkillAndLanguageSave, setIsFormSkillAndLanguageSave] = useState<boolean>(false)
  const [isFormAwardSave, setIsFormAwardSave] = useState<boolean>(false)
  const [isSubmitForm, setIsSubmitForm] = useState<boolean>(false)

  useEffect(() => {
    if (isFormPersonalValid) {
      const duplicateProcess = process;
      duplicateProcess[0].success = true;
      setProcess(duplicateProcess);
      setActiveMenu('education')
    }
  }, [formPersonal, isFormPersonalValid])

  useEffect(() => {
    if (isFormEducationlValid) {
      const duplicateProcess = process;
      duplicateProcess[1].success = true;
      setProcess(duplicateProcess);
      setActiveMenu('experience')
    }
  }, [formEducation, isFormEducationlValid])

  useEffect(() => {
    if (isFormExperienceSave) {
      const duplicateProcess = process;
      duplicateProcess[2].success = true;
      setProcess(duplicateProcess);
      setActiveMenu('skillAndLanguage')
    }
  }, [formExperience, isFormExperienceSave])

  useEffect(() => {
    if (isFormSkillAndLanguageSave) {
      const duplicateProcess = process;
      duplicateProcess[3].success = true;
      setProcess(duplicateProcess);
      setActiveMenu('licenseAndAwards')
    }
  }, [formSkillAndLanguage, isFormSkillAndLanguageSave])

  useEffect(() => {
    if (isFormAwardSave) {
      const duplicateProcess = process;
      duplicateProcess[4].success = true;
      setProcess(duplicateProcess);
      setActiveMenu('accountingAndFinancial')
    }
  }, [formAward, isFormAwardSave])

  useEffect(() => {
    if (formBankAccount) {
      const duplicateProcess = process;
      duplicateProcess[5].success = true;
      setProcess(duplicateProcess);
      if (isSubmitForm) {
        handleSubmitForm()
      }
    }
  }, [formBankAccount, isSubmitForm])

  const handleSubmitForm = () => {
    Swal.fire({
      title: "ยืนยันการสร้างบัญชีหรือไม่",
      text: "โปรดตรวจสอบข้อมูลให้ถูกต้อง",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ตรวจสอบข้อมูลอีกครั้ง"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const skill = formSkillAndLanguage.filter(item => item.type === 'skill');
        const language = formSkillAndLanguage.filter(item => item.type === 'language');
        const formRegisterData = {
          ...formPersonal,
          education: [...formEducation],
          experience: [...formExperience],
          skill: [...skill],
          language: [...language],
          award: [...formAward],
          bankAccount: {...formBankAccount}
        }

        if (formRegisterData?.profileImage) {
          const imageUrls = await uploadFileToFirebase([formPersonal.profileImage], `user/profile-image`, formPersonal['username']);
          formRegisterData['profileImage'] = imageUrls[0];
        } else {
          formRegisterData['profileImage'] = defaultProfileImage;
        }

        if (formRegisterData.bankAccount.bankAccountImage) {
          const imageUrls = await uploadFileToFirebase([formRegisterData.bankAccount.bankAccountImage], `user/bank-account`, formPersonal['username']);
          formRegisterData['bankAccount']['bankAccountImage'] = imageUrls[0];
        }

        const encryptPassword = await bcrypt.hash(formRegisterData['password'] as string, 10);
        delete formRegisterData['confirmPassword'];
        formRegisterData['password'] = encryptPassword;

        createUser(formRegisterData as unknown as FreelanceUsers).subscribe((res: any) => {
          localStorage.setItem("auth", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          Swal.fire({
            icon: "success",
            title: "สร้างบัญชีสำเร็จ",
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/`)
            }
          });

          router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/`);
        }, error => {
          if (error.response.status === 409) {
            Swal.fire({
              title: "ชื่อผู้ใช้งานนี้ซ้ำกับในระบบ",
              text: "โปรดเปลี่ยนชื่อผู้ใช้งาน",
              icon: "warning"
            })
          } else {
            Swal.fire({
              title: "เกิดข้อผิดพลาด",
              text: "โปรดลองใหม่อีกครั้ง",
              icon: "error"
            });
          }
        });
      } else {
        setIsSubmitForm(false)
      }
    });
  }

  return (
    <div>
      {activeMenu === "personal" && (
        <PersonalForm
          roleSelected={roleSelected}
          setRoleSelected={setRoleSelected}
          saveFormRegister={setFormPersonal}
          setIsFinished={setIsFormPersonalValid}
          defaultFormPersonal={formPersonal}
        />
      )}

      {activeMenu === "education" && (
        <EducationForm
          saveFormRegister={setFormEducation}
          defaultFormData={formEducation}
          setIsFormValid={setIsFormEducationValid}
        />
      )}

      {activeMenu === "experience" && (
        <ExperienceForm
          saveFormRegister={setFormExperience}
          defaultFormData={formExperience}
          setIsFormValid={setIsFormExperienceSave}
        />
      )}

      {activeMenu === "skillAndLanguage" && (
        <SkillLanguageForm
          saveFormRegister={setFormSkillAndLanguage}
          defaultFormData={formSkillAndLanguage}
          setIsFormValid={setIsFormSkillAndLanguageSave}
        />
      )}

      {activeMenu === "licenseAndAwards" && (
        <AwardForm
          saveFormRegister={setFormAward}
          defaultFormData={formAward}
          setIsFormValid={setIsFormAwardSave}
        />
      )}

      {activeMenu === "accountingAndFinancial" && (
        <AccountingForm
          saveFormRegister={setFormBankAccount}
          defaultFormData={formBankAccount}
          setIsSubmitForm={setIsSubmitForm}
        />
      )}
    </div>
  );
};

export default RegisterFreelance;
