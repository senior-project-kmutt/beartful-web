import { Users } from "@/models/users";
import { createUser } from "@/services/user/user.api";
import bcrypt from "bcryptjs";
import style from "@/styles/authentication/form/PersonalForm.module.scss";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import PersonalForm from "./FormRegister/PersonalForm";

interface formDataType {
  [key: string]: any;
}

interface Props {
  roleSelected: string;
  setRoleSelected: Dispatch<SetStateAction<string>>
  activeMenu: string
}
const RegisterFreelance = (props: Props) => {
  const { roleSelected, setRoleSelected, activeMenu} = props
  const [formPersonal, setFormPersonal] = useState<any>({})
  const [isFormPersonalValid, setIsFormPersonalValid] = useState<boolean>(false)
  
  return (
    <div>
      {activeMenu === "personal" ? (
        <PersonalForm
        roleSelected={roleSelected}
        setRoleSelected={setRoleSelected}
        saveFormRegister={setFormPersonal}
        setIsFinished={setIsFormPersonalValid}
      />
      ) : (
        <div>{activeMenu}</div>
      )}
    </div>
  );
};

export default RegisterFreelance;
