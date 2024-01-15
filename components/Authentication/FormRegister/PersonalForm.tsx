import { Users } from "@/models/users";
import { createUser } from "@/services/user/user.api";
import bcrypt from "bcryptjs";
import style from "@/styles/authentication/form/PersonalForm.module.scss";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

interface formDataType {
  [key: string]: any;
}

interface Props {
  roleSelected: string;
  setRoleSelected: Dispatch<SetStateAction<string>>;
  saveFormRegister: Dispatch<SetStateAction<any>>;
  setIsFinished: Dispatch<SetStateAction<boolean>>
}
const PersonalForm = (props: Props) => {
  const { roleSelected, setRoleSelected, saveFormRegister, setIsFinished} = props
  const [profileImage, serProfileImage] = useState<string>("https://i.pinimg.com/564x/d8/2c/87/d82c87e21e84a3e7649d16c968105553.jpg")
  const [formPersonal, setFormPersonal] = useState<object>({})
  const [errorMessgae, setErrorMessage] = useState<object>({})

  useEffect(() => {
    setFormPersonal({
      ...formPersonal,
      role: roleSelected,
      profile_image: profileImage
    })
  }, [])

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

  const handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const [file] = event.target.files;
      const imageSrc = URL.createObjectURL(file);
      serProfileImage(imageSrc);
      setFormPersonal({
        ...formPersonal,
        "profile_image": imageSrc
      })
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    if (inputName === 'role') {
      setRoleSelected(inputValue);
      setFormPersonal({
        ...formPersonal,
        [inputName]: inputValue
      })
    } else {
      setFormPersonal({
        ...formPersonal,
        [inputName]: inputValue
      })
    }
  }

  const onSubmit = () => {
    setIsFinished(true);
    saveFormRegister(formPersonal);
  }

  // const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
  //   const inputName = event.target.name;
  //   const inputValue = event.target.value;
  //   if (inputName === 'role') {
  //     // setRoleSelected(inputValue);
  //     setFormPersonal({
  //       ...formPersonal,
  //       [inputName]: inputValue
  //     })

  //   }
  // }

  return (
    <div className={style.main}>
      <div className="flex">
        <div className={style.input_field}>
          <div className={style.left}>
            <div className={style.each_field}>
              <label>
                <div>
                  <p>member type</p>
                </div>
                <select
                  onChange={(e) => handleInputChange(e)}
                  value={roleSelected}
                  id="role"
                  name="role"
                >
                  <option value="customer">customer</option>
                  <option value="freelance">freelance</option>
                </select>
              </label>
            </div>
            <div className={style.each_field}>
              <label>
                <div>
                  <p>firstname</p>
                  <p className={style.tips}>0 / 100 characters</p>
                </div>
                <input type="text" name="firstname" maxLength={100} onChange={(e) => handleInputChange(e)} />
              </label>
            </div>
            <div className={style.each_field}>
              <label>
                <div>
                  <p>e-mail</p>
                  <p className={style.tips}>0 / 100 characters</p>
                </div>
                <input type="text" name="email" maxLength={100} onChange={(e) => handleInputChange(e)} />
              </label>
            </div>
            <div className={style.each_field}>
              <label>
                <div>
                  <p>password</p>
                </div>
                <input type="password" name="password" onChange={(e) => handleInputChange(e)} />
              </label>
            </div>
          </div>
          <div className={style.right}>
            <div className={style.each_field}>
              <label>
                <div>
                  <p>username</p>
                  <p className={style.tips}>0 / 100 characters</p>
                </div>
                <input type="text" name="username" maxLength={100} onChange={(e) => handleInputChange(e)} />
              </label>
            </div>
            <div className={style.each_field}>
              <label>
                <div>
                  <p>lastname</p>
                  <p className={style.tips}>0 / 100 characters</p>
                </div>
                <input type="text" name="lastname" maxLength={100} onChange={(e) => handleInputChange(e)} />
              </label>
            </div>
            <div className={style.each_field}>
              <label>
                <div>
                  <p>phone number</p>
                  <p className={style.tips}>0 / 10 characters</p>
                </div>
                <input type="text" name="phoneNumber" maxLength={10} onChange={(e) => handleInputChange(e)} />
              </label>
            </div>
            <div className={style.each_field}>
              <label>
                <div>
                  <p>confirm password</p>
                </div>
                <input type="password" name="confirmPassword" onChange={(e) => handleInputChange(e)} />
              </label>
            </div>
          </div>
        </div>
        <div className={style.upload_image}>
          <div><img src={profileImage} alt="" /></div>
          <div className={style.input_image}>
            <label htmlFor="profile_image">
              <p>UPLOAD PICTURE</p>
            </label>
            <input
              onChange={handleInputFile}
              id="profile_image"
              type="file"
              accept="image/png, image/gif, image/jpeg"
            />
            <div className={style.tips}>
              <p>File size: maximum 1MB</p>
              <p>File extension: .JPEG, .PNG, .GIF</p>
            </div>
          </div>
        </div>
      </div>
      {roleSelected === 'freelance' && (
        <div>for freelance</div>
      )}
      <div className={style.button}>
        <button className={style.submit} onClick={onSubmit}>Submit</button>
        <button className={style.cancel}>Cancel</button>
      </div>
    </div>
  );
};

export default PersonalForm;
