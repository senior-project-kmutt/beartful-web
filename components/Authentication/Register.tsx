import { Users } from "@/models/users";
import { createUser } from "@/services/user/user.api";
import bcrypt from "bcryptjs";
import style from "@/styles/authentication/registerLayout.module.scss";
import RegisterCustomer from "./RegisterCustomer";
import { useState } from "react";
import RegisterFreelance from "./RegisterFreelance";

interface formDataType {
  [key: string]: any;
}
const Register = () => {
  const [roleSelected, setRoleSelected] = useState<string>('customer')
  const [activeMenu, setActiveMenu] = useState<string>('personal')
  const sideBarMenu = [
    {
      title: 'ข้อมูลทั่วไป',
      value: 'personal'
    },
    {
      title: 'ประวัติการศึกษา',
      value: 'education'
    },
    {
      title: 'ประสบการณ์ทำงาน',
      value: 'experience'
    },
    {
      title: 'ทักษะและภาษา',
      value: 'skillAndLanguage'
    },
    {
      title: 'ใบอนุญาติ / รางวัลที่ได้รับ',
      value: 'licenseAndAwards'
    },
    {
      title: 'ข้อมูลบัญชีและการเงิน',
      value: 'accountingAndFinancial'
    }
  ]
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const responseBody: formDataType = {};
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    for (const [property, value] of formData) {
      if (property === "password") {
        responseBody[property] = await bcrypt.hash(value as string, 10);
      } else {
        responseBody[property] = value;
      }
    }

    if (responseBody) {
      createUser(responseBody as unknown as Users);
    }
  };

  const handleChangeMenu = (menu: string) => {
    setActiveMenu(menu)
  }
  return (
    <div>
      <div className={style.container}>
        <div className={`${style.side_menu} ${roleSelected === 'customer' && style.close}`}>
          <div>
            {sideBarMenu.map((menu, index) => {
              return (
                <div
                  className={`${style.item} ${menu.value === activeMenu && style.active}`}
                  key={index}
                  onClick={() => handleChangeMenu(menu.value)}
                >
                  {menu.title}
                </div>
              )
            })}
          </div>
        </div>
        <div className={`${style.input_container} ${roleSelected === 'customer' && style.full}`}>
          {roleSelected === 'customer' ? (
            <>
              <RegisterCustomer roleSelected={roleSelected} setRoleSelected={setRoleSelected} />
            </>
          ) : (
            <RegisterFreelance roleSelected={roleSelected} setRoleSelected={setRoleSelected} activeMenu={activeMenu} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
