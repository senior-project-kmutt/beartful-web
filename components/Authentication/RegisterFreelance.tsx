import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PersonalForm from "./FormRegister/PersonalForm";
import { Process } from "./Register";
import EducationForm, { EducationItem } from "./FormRegister/EducationForm";

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
  const [isFormPersonalValid, setIsFormPersonalValid] = useState<boolean>(false)
  const [isFormEducationlValid, setIsFormEducationValid] = useState<boolean>(false)

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
    </div>
  );
};

export default RegisterFreelance;
