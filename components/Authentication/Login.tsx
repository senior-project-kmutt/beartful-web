import { LoginUser } from "@/models/users";
import { login } from "@/services/user/user.api";
import bcrypt from "bcryptjs";
import Link from "next/link";
import style from "@/styles/login/loginLayout.module.scss"
import { useState } from "react";
import Router from 'next/router';

interface formDataType {
  [key: string]: any;
}
const Login = () => {
  const [activeMenu, setActiveMenu] = useState<string>('sign in');
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const responseBody: formDataType = {};
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    for (const [property, value] of formData) {
      responseBody[property] = value;
    }

    if (responseBody) {
      const res = login(responseBody as unknown as LoginUser).subscribe((res: any) => {
        localStorage.setItem("auth", res.data.token);
        Router.push('/');
      })
    }
  };
  return (
    <div className={style.main}>
      <div>
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
          <div className={`${style.warp} mt-20`}>
            <form onSubmit={submitForm}>
              <div className={style.input_form}>
                <label>
                  USERNAME
                  <input name="username" type="text" />
                </label>
              </div>
              <div className={style.input_form}>
                <label>
                  PASSWORD
                  <input name="password" type="password" />
                </label>
              </div>
              <div className="ml-32">
                <input className={`${style.submit_button} mr-4`} type="submit" value="SIGN IN" />
                <Link className={style.cancle_button} href="/">CANCLE</Link>
                <p className="text-xs pt-3 pl-2 font-medium">New to BeArtFul?&nbsp;
                  <span onClick={() => setActiveMenu('sign up')} className="underline cursor-pointer">Create an account</span>
                </p>
              </div>
            </form>
          </div>
        )}

        {activeMenu === 'sign up' && (
          <div className={`${style.warp} p-16`}>
            WAIT FOR REGISTER!
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
