import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import PersonalForm from "./FormRegister/PersonalForm";
import { createUser } from "@/services/user/user.api";
import { Users } from "@/models/users";

interface formDataType {
  [key: string]: any;
}

interface Props {
  roleSelected: string;
  setRoleSelected: Dispatch<SetStateAction<string>>
}
const RegisterCustomer = (props: Props) => {
  const { roleSelected, setRoleSelected} = props;
  const [formPersonal, setFormPersonal] = useState<Users>()
  const [isFormPersonalValid, setIsFormPersonalValid,] = useState<boolean>(false)

  useEffect(() => {
    if (isFormPersonalValid) {
      createUser(formPersonal as unknown as Users);
    }
  }, [formPersonal])
  
  return (
    <>
      <PersonalForm
        roleSelected={roleSelected}
        setRoleSelected={setRoleSelected}
        saveFormRegister={setFormPersonal}
        setIsFinished={setIsFormPersonalValid}
      />
    </>
  );
};

export default RegisterCustomer;
