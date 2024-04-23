import { LoginUser } from "@/models/users";
import { login } from "@/services/user/user.api";
import Link from "next/link";
import style from "@/styles/authentication/loginLayout.module.scss"
import { useEffect, useState } from "react";
import Router, { useRouter } from 'next/router';
import Swal from 'sweetalert2'
import Register from "./Register";
import { LOGO_IMAGE } from "@/config/constants";

interface formDataType {
  [key: string]: any;
}
const Authentication = () => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<string>('');
  const [usernameErr, setUsernameErr] = useState<string>('');
  const [passwordErr, setPasswordErr] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlSearchString = window.location.search;
      const params = new URLSearchParams(urlSearchString);
      const page = params.get('page');
      setActiveMenu(page || '')
    }
  }, []);

  const changePageParams = (params: string) => {
    setActiveMenu(params);
    router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/authen?page=${params}`);
  }


  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const responseBody: formDataType = {};
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    let isValid = true;

    for (const [property, value] of formData) {
      responseBody[property] = value;
      if (!value) {
        isValid = false
        if (property === 'username') {
          setUsernameErr('กรุณากรอกชื่อผู้ใช้')
        }
        if (property === 'password') {
          setPasswordErr('กรุณากรอกรหัสผ่าน')
        }
      }
    }

    if (isValid) {
      login(responseBody as unknown as LoginUser).subscribe((res: any) => {
        localStorage.setItem("auth", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/`)
      }, error => {
        if (error.response?.status === 401) {
          Swal.fire({
            icon: "error",
            title: "กรุณาลองใหม่อีกครั้ง!",
            text: "ชื่อผู้ใช้งาน หรือ รหัสผ่าน ไม่ถูกต้อง"
          });
        } else {
          console.log(error);
        }
      })
    }
  };

  return (
    <div>
      <div className={`${style.main} fixed inset-0 mt-8`}>
      <div>
        <div className={style.welcome}>
            {activeMenu === "login" && (
              <>
                <h1>ยินดีต้อนรับ</h1>
                <p>พวกเราดีใจที่คุณกลับมา !</p>
              </>
            )}

            {activeMenu === "signup" && (
              <div className={style.sign_in}>
                <h1>สมัครสมาชิก <span className="">BEARTFUL</span> </h1>
                <p>กรอกข้อมูลในฟอร์มเพื่อสมัครเป็นสมาชิก</p>
                <p>เป็นสมาชิกยู่แล้ว ? <span onClick={() => changePageParams('login')} className="font-extrabold cursor-pointer underline transition duration-300 ease-in-out hover:text-primary4 hover:drop-shadow-md">เข้าสู่ระบบ</span></p>
              </div>
            )}
        </div>
        <div className={style.warp}>
          <div className={style.switch}>
            <div
              onClick={() => changePageParams('login')}
              className={activeMenu === 'login' ? `${style.item_active}` : `${style.item}`}
            >
              เข้าสู่ระบบ
            </div>
            <div
              onClick={() => changePageParams('signup')}
              className={activeMenu === 'signup' ? `${style.item_active}` : `${style.item}`}
            >
              สมัครสมาชิก
            </div>
          </div>
        </div>

        {activeMenu === 'login' && (
          <div>
            <div className={`${style.warp} mt-14`}>
              <form onSubmit={submitForm}>
                <div className={style.input_form}>
                  <label htmlFor='username'> ชื่อผู้ใช้งาน </label>
                  <div><input onChange={() => setUsernameErr('')} id="username" name="username" type="text" /></div>
                  <p></p><p className={style.error_message}>{usernameErr}</p>
                </div>
                <div className={style.input_form}>
                  <label htmlFor="password"> รหัสผ่าน </label>
                  <div><input onChange={() => setPasswordErr('')} id="password" name="password" type="password" /></div>
                  <p></p><p className={style.error_message}>{passwordErr}</p>
                </div>
                <div className={style.input_button}>
                  <input className={`${style.submit_button} mr-4`} type="submit" value="เข้าสู่ระบบ" />
                  <div className={style.cancel_button} onClick={()=>router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/`)}>ยกเลิก</div>
                  <p className="text-xs pt-3 pl-2 font-medium">ยังไม่ได้เป็นสมาชิก?&nbsp;
                    <span onClick={() => changePageParams('signup')} className="font-semibold underline cursor-pointer transition duration-300 ease-in-out hover:text-primary4 hover:drop-shadow-md">คลิกเพื่อสมัครสมาชิก</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeMenu === 'signup' && (
          <div className={`${style.warp} p-16`}>
            <Register />
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Authentication;
