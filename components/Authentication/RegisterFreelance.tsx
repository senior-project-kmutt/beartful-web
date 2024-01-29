import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PersonalForm from "./FormRegister/PersonalForm";
import { Process } from "./Register";
import EducationForm, { EducationItem } from "./FormRegister/EducationForm";
import ExperienceForm, { ExperienceItem } from "./FormRegister/ExperienceForm";
import SkillLanguageForm, { SkillAndLanguageItem } from "./FormRegister/SkillLanguageForm";
import AwardForm, { AwardItem } from "./FormRegister/AwardForm";

interface Props {
  roleSelected: string;
  setRoleSelected: Dispatch<SetStateAction<string>>
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>
  process: Process[];
  setProcess: Dispatch<SetStateAction<Process[]>>
}
const RegisterFreelance = (props: Props) => {
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
  const [isFormPersonalValid, setIsFormPersonalValid] = useState<boolean>(false)
  const [isFormEducationlValid, setIsFormEducationValid] = useState<boolean>(false)
  const [isFormExperienceSave, setIsFormExperienceSave] = useState<boolean>(false)
  const [isFormSkillAndLanguageSave, setIsFormSkillAndLanguageSave] = useState<boolean>(false)
  const [isFormAwardSave, setIsFormAwardSave] = useState<boolean>(false)

  useEffect(() => {
    if (formPersonal) {
      const duplicateProcess = process;
      duplicateProcess[0].success = true;
      setProcess(duplicateProcess);
      setActiveMenu('education')
    }
  }, [formPersonal])

  useEffect(() => {
    if (isFormEducationlValid) {
      const duplicateProcess = process;
      duplicateProcess[1].success = true;
      setProcess(duplicateProcess);
      setActiveMenu('experience')
    }
  }, [formEducation])

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
    </div>
  );
};

export default RegisterFreelance;
