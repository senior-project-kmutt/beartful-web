import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PersonalForm from "./FormRegister/PersonalForm";
import { createUser } from "@/services/user/user.api";
import { Users } from "@/models/users";
import { uploadFileToFirebase } from "@/services/firebase/firebase-api";
import { defaultProfileImage } from "@/config/constants";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import bcrypt from "bcryptjs";

interface Props {
  roleSelected: string;
  setRoleSelected: Dispatch<SetStateAction<string>>
}
const RegisterCustomer = (props: Props) => {
  const router = useRouter()
  const { roleSelected, setRoleSelected} = props;
  const [formPersonal, setFormPersonal] = useState<any>()
  const [isFormPersonalValid, setIsFormPersonalValid,] = useState<boolean>(false)

  useEffect(() => {
    if (isFormPersonalValid) {
      Swal.fire({
        title: "ยืนยันการสร้างบัญชีหรือไม่",
        text: "โปรดตรวจสอบข้อมูลให้ถูกต้อง",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ตรวจสอบข้อมูลอีกครั้ง"
      }).then((result) => {
        if (result.isConfirmed) {
          handleSubmitFormRegister();
          
        } else {
          setIsFormPersonalValid(false);
        }
      });
    }
  }, [formPersonal, isFormPersonalValid])

  const handleSubmitFormRegister = async () => {
    const submitFromData = {...formPersonal}
    if (formPersonal?.profileImage) {
      const imageUrls = await uploadFileToFirebase([formPersonal.profileImage], `user/profile-image`, formPersonal['username']);
      submitFromData['profileImage'] = imageUrls[0];
    } else {
      submitFromData['profileImage'] = defaultProfileImage;
    }
    const encryptPassword = await bcrypt.hash(submitFromData['password'] as string, 10);
    delete submitFromData['confirmPassword'];
    submitFromData['password'] = encryptPassword;
    createUser(submitFromData as unknown as Users).subscribe((res: any) => {
      localStorage.setItem("auth", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      Swal.fire({
        icon: "success",
        title: "สร้างบัญชีสำเร็จ",
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          router.push('/')
        }
      });
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
  }
  return (
    <>
      <PersonalForm
        roleSelected={roleSelected}
        setRoleSelected={setRoleSelected}
        saveFormRegister={setFormPersonal}
        setIsFinished={setIsFormPersonalValid}
        defaultFormPersonal={formPersonal}
      />
    </>
  );
};

export default RegisterCustomer;
