import { useEffect, useState } from "react";
import { IUser } from "../../chat";
import AccountingForm from "@/components/Authentication/FormRegister/AccountingForm";
import ProfileSelectBarFreelance from "@/components/Profile/Freelance/ProfileSelectBar";
import style from '@/styles/profile/freelance/artwork/viewArtwork.module.scss'
import { getUserById, updateBankAccount } from "@/services/user/user.api";
import Swal from "sweetalert2";
import { uploadFileToFirebase } from "@/services/firebase/firebase-api";

const ProfileBankAccount = () => {
  const [user, setUser] = useState<IUser>();
  const [formBankAccount, setFormBankAccount] = useState<any>();
  const [bankAccountInfo, setBankAccountInfo] = useState<any>();

  useEffect(() => {
    const user: IUser = JSON.parse(localStorage.getItem('user') || '');
    setUser(user);
  }, []);

  useEffect(() => {
    getBankAccount();
  }, [user]);

  useEffect(() => {
    if (formBankAccount) {
      if (checkDataIsChange()) {
        handleSubmit()
      }
    }
  }, [formBankAccount]);

  const handleSubmit = async () => {
    if (user) {
      const formSubmitData = { ...formBankAccount }

      if (typeof formSubmitData.bankAccountImage == 'object') {
        const imageUrls = await uploadFileToFirebase([formSubmitData.bankAccountImage], `user/bank-account`, user?.username);
        formSubmitData['bankAccountImage'] = imageUrls[0];
      }
      const token = localStorage.getItem('auth');
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const updateData = {
        bankAccount: formSubmitData
      }
      updateBankAccount(user.id, updateData, headers).then((res) => {
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

  const getBankAccount = () => {
    const token = localStorage.getItem('auth');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    if (user) {
      getUserById(user.id, headers).then((res) => {
        setBankAccountInfo(res.bankAccount);
        setFormBankAccount(res.bankAccount);
      })
        .catch(error => console.log(error));
    }
  }

  const checkDataIsChange = () => {
    for (let key in formBankAccount) {
      if (formBankAccount[key] !== bankAccountInfo[key]) {
        return true
      }
    }
    return false
  }

  return (
    <>
      <div className="flex mt-16">

      <div className="fixed inset-0 bg-white z-3 mt-20" style={{ width: "22%" }}>
          <ProfileSelectBarFreelance activeMenu='bankAccount' />
        </div>

        <div className="fixed mt-32 mb-8 inset-0 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 32px)', zIndex: 20, marginLeft: "350px" }}>
          <AccountingForm saveFormRegister={setFormBankAccount} defaultFormData={formBankAccount} />
        </div>
      </div>
    </>
  );
};

export default ProfileBankAccount;
