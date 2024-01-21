import { Users } from "@/models/users";
import { createUser } from "@/services/user/user.api";
import bcrypt from "bcryptjs";
import style from "@/styles/authentication/form/EducationForm.module.scss";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import EducationItem from "./EducationFormItem";

interface formDataType {
  [key: string]: any;
}

interface Props {
  saveFormRegister: Dispatch<SetStateAction<any>>;
  setIsFinished: Dispatch<SetStateAction<boolean>>;
  defaultFormPersonal: any
}
const EducationForm = (props: Props) => {
  const [numberEducationItem, setNumberEducationItem] = useState<number>(1)
  const generateEducationBox = (start: number, end: number) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
      <div>
        <EducationItem key={i} />

      </div>
      );
    }
    return options;
  }

  const addEducationBox = () => {
    setNumberEducationItem(numberEducationItem + 1)
  }


  return (
    <div>
      <h1 className={style.title}>ข้อมูลประวัติการศึกษา</h1>
      <div>
        {generateEducationBox(1, numberEducationItem)}
      </div>
      <div className={style.add_button} onClick={addEducationBox}>
        + เพิ่มข้อมูล
      </div>
    </div>
  );
};

export default EducationForm;
