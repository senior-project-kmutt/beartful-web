import style from "@/styles/authentication/registerLayout.module.scss";
import RegisterCustomer from "./RegisterCustomer";
import { useState } from "react";
import RegisterFreelance from "./RegisterFreelance";

interface formDataType {
  [key: string]: any;
}

export interface Process {
  title: string,
  value: string,
  success?: boolean 

}

export const defaultProcessFreelance: Process[] = [
  {
    title: 'ข้อมูลทั่วไป',
    value: 'personal',
    success: false
  },
  {
    title: 'ประวัติการศึกษา',
    value: 'education',
    success: false
  },
  {
    title: 'ประสบการณ์ทำงาน',
    value: 'experience',
    success: false
  },
  {
    title: 'ทักษะและภาษา',
    value: 'skillAndLanguage',
    success: false
  },
  {
    title: 'ใบอนุญาต / รางวัลที่ได้รับ',
    value: 'licenseAndAwards',
    success: false
  },
  {
    title: 'ข้อมูลบัญชีและการเงิน',
    value: 'accountingAndFinancial',
    success: false
  }
]

const Register = () => {
  const [roleSelected, setRoleSelected] = useState<string>('customer')
  const [activeMenu, setActiveMenu] = useState<string>('personal')
  const [processFreelance, setProcessFreelance] = useState<Process[]>(defaultProcessFreelance)

  const handleChangeMenu = (menu: Process) => {
    if (menu.success) {
      setActiveMenu(menu.value)
    }
  }
  return (
    <div>
      <div className={style.container}>
        <div className={`${style.side_menu} ${roleSelected === 'customer' && style.close}`}>
          <div>
            {defaultProcessFreelance.map((menu, index) => {
              return (
                <div
                  className={`${menu.success ? `${style.itemSuccess}` : `${style.itemUnsuccess}`} ${menu.value === activeMenu && style.active}`}
                  key={index}
                  onClick={() => handleChangeMenu(menu)}
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
            <RegisterFreelance
              roleSelected={roleSelected}
              setRoleSelected={setRoleSelected}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              processes={processFreelance}
              setProcess={setProcessFreelance}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
