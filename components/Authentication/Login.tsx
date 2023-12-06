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
              <div className={style.input_button}>
                <input className={`${style.submit_button} mr-4`} type="submit" value="SIGN IN" />
                <Link className={style.cancel_button} href="/">CANCEL</Link>
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
