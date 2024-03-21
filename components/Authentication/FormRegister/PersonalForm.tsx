import style from "@/styles/authentication/form/PersonalForm.module.scss";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { errorMessageEmtryField, regexpEmail, regexpOnlyNumber, requiredFieldsCustomer, requiredFieldsFreelancePersonal } from "@/services/validation";
import { thaiMonths } from "./option";
import { defaultProfileImage } from "@/config/constants";
import Link from "next/link";
import Router from 'next/router';

interface formDataType {
  [key: string]: any;
}

interface Props {
  roleSelected: string;
  setRoleSelected: Dispatch<SetStateAction<string>>;
  saveFormRegister: Dispatch<SetStateAction<any>>;
  setIsFinished: Dispatch<SetStateAction<boolean>>;
  defaultFormPersonal: any
}
const PersonalForm = (props: Props) => {
  const { roleSelected, setRoleSelected, saveFormRegister, setIsFinished, defaultFormPersonal } = props
  const [profileImage, setProfileImage] = useState<string>(defaultProfileImage);
  const [profileImageFile, setProfileImageFile] = useState<File>()
  const [formPersonal, setFormPersonal] = useState<formDataType>({})
  const [errorMessage, setErrorMessage] = useState<formDataType>({})

  useEffect(() => {
    setIsFinished(false);
    if (defaultFormPersonal) {
      if (defaultFormPersonal.dateOfBirth) {
        defaultFormPersonal.date = defaultFormPersonal.dateOfBirth?.getDate();
        defaultFormPersonal.month = defaultFormPersonal.dateOfBirth?.getMonth();
        defaultFormPersonal.year = defaultFormPersonal.dateOfBirth?.getFullYear() + 543;
        delete defaultFormPersonal.dateOfBirth;
      }
      if (defaultFormPersonal.profileImage) {
        const imageSrc = convertFileToBlob(defaultFormPersonal.profileImage);
        setProfileImage(imageSrc);
        setProfileImageFile(defaultFormPersonal.profileImage);
      } else {
        setProfileImage(defaultProfileImage)
      }
      setFormPersonal(defaultFormPersonal);
    } else {
      setFormPersonal({
        ...formPersonal,
        role: roleSelected,
        profileImage: defaultProfileImage,
        date: "",
        month: "",
        year: ""
      })
    }
  }, [])

  const handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const [file] = event.target.files;
      const imageSrc = convertFileToBlob(file)
      setProfileImage(imageSrc);
      setProfileImageFile(file);
    }
  }

  const convertFileToBlob = (file: File) => {
    return URL.createObjectURL(file);
  }

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setErrorMessage({
      ...errorMessage,
      [inputName]: ''
    })

    if ((inputName === 'date' || inputName === 'month' || inputName === 'year')) {
      setErrorMessage({
        ...errorMessage,
        dateOfBirth: ''
      })

    }

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
    const submitDataForm = { ...formPersonal };

    if (roleSelected === 'customer') {
      requiredFieldsCustomer.forEach(key => {
        if (!submitDataForm[key]) {
          newErrorMessage[key] = errorMessageEmtryField[key];
          isValid = false;
        }
      });
    }

    if (roleSelected === 'freelance') {
      const { date, month, year } = submitDataForm;
      if ((date && month && year)) {
        const dateOfBirth = new Date(year - 543, month, date);
        submitDataForm['dateOfBirth'] = dateOfBirth;
      }
      requiredFieldsFreelancePersonal.forEach(key => {
        if (!submitDataForm[key]) {
          newErrorMessage[key] = errorMessageEmtryField[key];
          isValid = false;
        }
      });
    }

    if (!regexpEmail.test(submitDataForm['email'])) {
      newErrorMessage['email'] = 'กรุณาระบุ e-mail ให้ถูกต้อง'
      isValid = false;
    }

    if (!regexpOnlyNumber.test(submitDataForm['phoneNumber'])) {
      newErrorMessage['phoneNumber'] = 'กรุณาระบุให้ถูกต้อง'
      isValid = false;
    }

    if (submitDataForm['confirmPassword'] !== submitDataForm['password']) {
      newErrorMessage['confirmPassword'] = 'รหัสผ่านไม่ตรงกัน'
      isValid = false;
    }

    setErrorMessage(newErrorMessage);
    if (isValid) {
      delete submitDataForm['date'];
      delete submitDataForm['month'];
      delete submitDataForm['year'];
      if (profileImageFile) {
        submitDataForm['profileImage'] = profileImageFile
      } else {
        submitDataForm['profileImage'] = null;
      }
      setIsFinished(true);
      saveFormRegister(submitDataForm);
    }
  }

  function generateOptions(start: number, end: number) {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  }

  return (
    <div className={style.main}>
      <div className="flex justify-center">
        <div className={style.input_field}>
          <div className="flex justify-center">
            <div className={style.left}>
              <div className={style.each_field}>
                <label>
                  <div>
                    <p>ประเภทสมาชิก</p>
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
                    <p>ชื่อ</p>
                    <p className={style.tips}>{formPersonal.firstname?.length || 0} / 100 ตัวอักษร</p>
                  </div>
                  <input
                    type="text"
                    name="firstname"
                    maxLength={100}
                    onChange={(e) => handleInputChange(e)}
                    value={formPersonal.firstname}
                  />
                  <p className={style.error}>{errorMessage.firstname}</p>
                </label>
              </div>
              <div className={style.each_field}>
                <label>
                  <div>
                    <p>อีเมล</p>
                    <p className={style.tips}>{formPersonal.email?.length || 0} / 100 ตัวอักษร</p>
                  </div>
                  <input
                    type="text"
                    name="email"
                    maxLength={100}
                    onChange={(e) => handleInputChange(e)}
                    value={formPersonal.email}
                  />
                  <p className={style.error}>{errorMessage.email}</p>
                </label>
              </div>
              <div className={style.each_field}>
                <label>
                  <div>
                    <p>รหัสผ่าน</p>
                  </div>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => handleInputChange(e)}
                    value={formPersonal.password}
                  />
                  <p className={style.error}>{errorMessage.password}</p>
                </label>
              </div>
            </div>
            <div className={style.right}>
              <div className={style.each_field}>
                <label>
                  <div>
                    <p>ชื่อผู้ใช้งาน</p>
                    <p className={style.tips}>{formPersonal.username?.length || 0} / 100 ตัวอักษร</p>
                  </div>
                  <input
                    type="text"
                    name="username"
                    maxLength={100}
                    onChange={(e) => handleInputChange(e)}
                    value={formPersonal.username}
                  />
                  <p className={style.error}>{errorMessage.username}</p>
                </label>
              </div>
              <div className={style.each_field}>
                <label>
                  <div>
                    <p>นามสกุล</p>
                    <p className={style.tips}>{formPersonal.lastname?.length || 0} / 100 ตัวอักษร</p>
                  </div>
                  <input
                    type="text"
                    name="lastname"
                    maxLength={100}
                    onChange={(e) => handleInputChange(e)}
                    value={formPersonal.lastname}
                  />
                  <p className={style.error}>{errorMessage.lastname}</p>
                </label>
              </div>
              <div className={style.each_field}>
                <label>
                  <div>
                    <p>เบอร์โทรศัพท์</p>
                    <p className={style.tips}>{formPersonal.phoneNumber?.length || 0} / 10 ตัวอักษร</p>
                  </div>
                  <input
                    type="text"
                    name="phoneNumber"
                    maxLength={10}
                    onChange={(e) => handleInputChange(e)}
                    value={formPersonal.phoneNumber}
                  />
                  <p className={style.error}>{errorMessage.phoneNumber}</p>
                </label>
              </div>
              <div className={style.each_field}>
                <label>
                  <div>
                    <p>ยืนยันรหัสผ่าน</p>
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={(e) => handleInputChange(e)}
                    value={formPersonal.confirmPassword}
                  />
                  <p className={style.error}>{errorMessage.confirmPassword}</p>
                </label>
              </div>
            </div>
          </div>
          {roleSelected === 'freelance' && (
            <div>
              <div className="mb-6">
                <label>
                  <p>วัน เดือน ปีเกิด</p>
                </label>
                <div className={style.dateOfBirth}>
                  <div className={style.date}>
                    <select
                      onChange={(e) => handleInputChange(e)}
                      value={formPersonal.date}
                      id="date"
                      name="date"
                    >
                      <option value="" disabled selected>- เลือกวันที่ -</option>
                      {generateOptions(1, 31)}
                    </select>
                  </div>
                  <div className={style.month}>
                    <select
                      onChange={(e) => handleInputChange(e)}
                      value={formPersonal.month}
                      id="month"
                      name="month"
                    >
                      <option value="" disabled selected>- เลือกเดือน -</option>
                      {thaiMonths.map((month, index) => {
                        return (
                          <option key={index} value={index}>{month}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className={style.year}>
                    <select
                      onChange={(e) => handleInputChange(e)}
                      value={formPersonal.year}
                      id="year"
                      name="year"
                    >
                      <option value="" disabled selected>- เลือกปี -</option>
                      {generateOptions(2460, 2549)}
                    </select>
                  </div>
                </div>
                <p className={`${style.error} pt-1`}>{errorMessage.dateOfBirth}</p>
              </div>
              <div>
                <label>
                  <div>
                    <p>ที่อยู่ปัจจุบัน</p>
                  </div>
                  <textarea
                    name="address"
                    onChange={(e) => handleInputChange(e)}
                    value={formPersonal.address}
                  />
                  <p className={style.error}>{errorMessage.address}</p>
                </label>

              </div>
            </div>
          )}
        </div>
        <div className={style.upload_image}>
          <div><img src={profileImage} alt="" /></div>
          <div className={style.input_image}>
            <label htmlFor="profile_image">
              <p>อัปโหลดรูปโปรไฟล์</p>
            </label>
            <input
              onChange={handleInputFile}
              id="profile_image"
              type="file"
              accept="image/png, image/gif, image/jpeg"
            />
            <div className={style.tips}>
              {/* <p>File size: maximum 1MB</p> */}
              <p>รองรับไฟล์: .JPEG, .PNG, .GIF เท่านั้น</p>
            </div>
          </div>
        </div>
      </div>
      <div className={style.button}>
        <div className="flex justify-center">
          <button className={style.submit} onClick={onSubmit}>
            {roleSelected === 'customer' ? 'ยืนยัน' : 'บันทึก'}
          </button>
          <button className={style.cancel} onClick={() => Router.back()}>ยกเลิก</button>
        </div>
      </div>
    </div>
  );
};

export default PersonalForm;