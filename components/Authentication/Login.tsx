import { LoginUser } from "@/models/users";
import { login } from "@/services/user/user.api";
import Link from "next/link";
import style from "@/styles/login/loginLayout.module.scss"
import { useState } from "react";
import Router from 'next/router';
import Swal from 'sweetalert2'

interface formDataType {
  [key: string]: any;
}
const Login = () => {
  const [activeMenu, setActiveMenu] = useState<string>('sign in');
  const [usernameErr, setUsernameErr] = useState<string>('');
  const [passwordErr, setPasswordErr] = useState<string>('');
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
        Router.back();
      }, error => {
        console.log(error);
        if (error.response?.status === 401) {
          Swal.fire({
            icon: "error",
            title: "Please Try Again!",
            text: " username or password not correct"
          });
        } else {
          console.log(error);
        }
      })
    }
  };

  return (
    <div>
      <Link href="/">
        <img src="/ssi1/picture/logo.png" className="h-4 sm:h-6 ml-6 mt-6" alt="Beartful Logo" />
      </Link>
      <div className={style.main}>
      <div>
        <div className={style.welcome}>
          <h1>WELCOME</h1>
          <p>We are really happy to see you again !</p>
        </div>
        <div className={style.warp}>
          <div className={style.switch}>
            <div
              onClick={() => setActiveMenu('sign in')}
              className={activeMenu === 'sign in' ? `${style.item_active}` : `${style.item}`}
            >
              SIGN IN
            </div>
            <div
              onClick={() => setActiveMenu('sign up')}
              className={activeMenu === 'sign up' ? `${style.item_active}` : `${style.item}`}
            >
              SIGN UP
            </div>
          </div>
        </div>

        {activeMenu === 'sign in' && (
          <div>
            <div className={`${style.warp} mt-14`}>
              <form onSubmit={submitForm}>
                <div className={style.input_form}>
                  <label htmlFor='username'> USERNAME </label>
                  <div><input onChange={() => setUsernameErr('')} id="username" name="username" type="text" /></div>
                  <p></p><p className={style.error_message}>{usernameErr}</p>
                </div>
                <div className={style.input_form}>
                  <label htmlFor="password"> PASSWORD </label>
                  <div><input onChange={() => setPasswordErr('')} id="password" name="password" type="password" /></div>
                  <p></p><p className={style.error_message}>{passwordErr}</p>
                </div>
                <div className={style.input_button}>
                  <input className={`${style.submit_button} mr-4`} type="submit" value="SIGN IN" />
                  <Link className={style.cancel_button} href="/">CANCEL</Link>
                  <p className="text-xs pt-3 pl-2 font-medium">New to BeArtFul?&nbsp;
                    <span onClick={() => setActiveMenu('sign up')} className="underline cursor-pointer">Create an account</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeMenu === 'sign up' && (
          <div className={`${style.warp} p-16`}>
            WAIT FOR REGISTER!
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Login;
