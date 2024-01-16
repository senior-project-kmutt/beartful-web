import { Users } from "@/models/users";
import { createUser } from "@/services/user/user.api";
import bcrypt from "bcryptjs";
import style from "@/styles/authentication/form/PersonalForm.module.scss";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { errorMessageEmtryField, regexpEmail, regexpOnlyNumber, requiredFieldsCustomer } from "@/services/validation";
import { uploadFileToFirebase } from "@/services/firebase/firebase-api";

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
  const defaultProfileImage = "https://i.pinimg.com/564x/d8/2c/87/d82c87e21e84a3e7649d16c968105553.jpg";
  const { roleSelected, setRoleSelected, saveFormRegister, setIsFinished } = props
  const [profileImage, setProfileImage] = useState<string>(defaultProfileImage);
  const [profileImageFile, setProfileImageFile] = useState<File[]>()
  const [formPersonal, setFormPersonal] = useState<formDataType>({})
  const [errorMessage, setErrorMessage] = useState<formDataType>({})

  useEffect(() => {
    setFormPersonal({
      ...formPersonal,
      role: roleSelected,
      profileImage: profileImage
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
      setProfileImage(imageSrc);
      setProfileImageFile([
        ...event.target.files
      ]);
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setErrorMessage({
      ...errorMessage,
      [inputName]: ''
    })

    if (inputName === 'role') {
      setRoleSelected(inputValue);
      setFormPersonal({
        ...formPersonal,
        [inputName]: inputValue
      })
    }
    
    if (inputName === 'email') {
      if (!regexpEmail.test(inputValue)) {
        setErrorMessage({
          ...errorMessage,
          [inputName]: 'กรุณาระบุ e-mail ให้ถูกต้อง'
        })
      }
    }

    setFormPersonal({
      ...formPersonal,
      [inputName]: inputValue
    })
  }

  const onSubmit = async () => {
    let isValid: boolean = true;
    const newErrorMessage: formDataType = {};

    requiredFieldsCustomer.forEach(key => {
      if (!formPersonal[key]) {
        newErrorMessage[key] = errorMessageEmtryField[key];
        isValid = false;
      }
    });

    if (!regexpEmail.test(formPersonal['email'])) {
      console.log(formPersonal['email']);
      newErrorMessage['email'] = 'กรุณาระบุ e-mail ให้ถูกต้อง'
      isValid = false;
    }

    if (!regexpOnlyNumber.test(formPersonal['phoneNumber'])) {
      newErrorMessage['phoneNumber'] = 'กรุณาระบุให้ถูกต้อง'
      isValid = false;
    }

    if (formPersonal['confirmPassword'] !== formPersonal['password']) {
      newErrorMessage['confirmPassword'] = 'รหัสผ่านไม่ตรงกัน'
      isValid = false;
    }

    setErrorMessage(newErrorMessage);
    if (isValid) {
      const submitDataForm = formPersonal;
      const encryptPassword = await bcrypt.hash(submitDataForm['password'] as string, 10);
      delete submitDataForm['confirmPassword'];
      submitDataForm['password'] = encryptPassword
      if (profileImageFile) {
        const imageUrls = await uploadFileToFirebase(profileImageFile, `user/profile-image`, formPersonal['username']);
        submitDataForm['profileImage'] = imageUrls[0]
      } else {
        submitDataForm['profileImage'] = defaultProfileImage;
      }
      setIsFinished(true);
      saveFormRegister(submitDataForm);
    }
  }

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
                <input
                  type="text"
                  name="firstname"
                  maxLength={100}
                  onChange={(e) => handleInputChange(e)}
                />
                <p className={style.error}>{errorMessage.firstname}</p>
              </label>
            </div>
            <div className={style.each_field}>
              <label>
                <div>
                  <p>e-mail</p>
                  <p className={style.tips}>0 / 100 characters</p>
                </div>
                <input
                  type="text"
                  name="email"
                  maxLength={100}
                  onChange={(e) => handleInputChange(e)}
                />
                <p className={style.error}>{errorMessage.email}</p>
              </label>
            </div>
            <div className={style.each_field}>
              <label>
                <div>
                  <p>password</p>
                </div>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => handleInputChange(e)}
                />
                <p className={style.error}>{errorMessage.password}</p>
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
                <input
                  type="text"
                  name="username"
                  maxLength={100}
                  onChange={(e) => handleInputChange(e)}
                />
                <p className={style.error}>{errorMessage.username}</p>
              </label>
            </div>
            <div className={style.each_field}>
              <label>
                <div>
                  <p>lastname</p>
                  <p className={style.tips}>0 / 100 characters</p>
                </div>
                <input
                  type="text"
                  name="lastname"
                  maxLength={100}
                  onChange={(e) => handleInputChange(e)}
                />
                <p className={style.error}>{errorMessage.lastname}</p>
              </label>
            </div>
            <div className={style.each_field}>
              <label>
                <div>
                  <p>phone number</p>
                  <p className={style.tips}>0 / 10 characters</p>
                </div>
                <input
                  type="text"
                  name="phoneNumber"
                  maxLength={10}
                  onChange={(e) => handleInputChange(e)}
                />
                <p className={style.error}>{errorMessage.phoneNumber}</p>
              </label>
            </div>
            <div className={style.each_field}>
              <label>
                <div>
                  <p>confirm password</p>
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={(e) => handleInputChange(e)}
                />
                <p className={style.error}>{errorMessage.confirmPassword}</p>
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
