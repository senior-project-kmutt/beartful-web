import { ChangeEvent, useEffect, useState } from "react";
import style from '@/styles/profile/freelance/personal/personalForm.module.scss'
import { getUserById, updatePersonal } from "@/services/user/user.api";
import Swal from "sweetalert2";
import { thaiMonths } from "@/components/Authentication/FormRegister/option";
import { errorMessageEmtryField, regexpEmail, regexpOnlyNumber, requiredFieldsFreelancePersonalUpdate } from "@/services/validation";
import { IUser } from "@/pages/chat";
import { defaultProfileImage } from "@/config/constants";
import { uploadFileToFirebase } from "@/services/firebase/firebase-api";

interface formDataType {
  [key: string]: any;
}


const PersonalUpdateForm = () => {
  const [user, setUser] = useState<IUser>();

  // formData
  const [formPersonal, setFormPersonal] = useState<formDataType>({});
  const [errorMessage, setErrorMessage] = useState<formDataType>({});
  const [profileImage, setProfileImage] = useState<string>(defaultProfileImage);
  const [profileImageFile, setProfileImageFile] = useState<File>();

  useEffect(() => {
    const user: IUser = JSON.parse(localStorage.getItem('user') || '');
    setUser(user);
  }, []);

  useEffect(() => {
    getFreelanceDetailsInfo();
  }, [user]);

  const getFreelanceDetailsInfo = () => {
    const headers = getHeaderRequest();
    if (user) {
      getUserById(user.id, headers).then((res: any) => {
        const transformData: any = {
          firstname: res.firstname,
          lastname: res.lastname,
          email: res.email,
          phoneNumber: res.phoneNumber,
          dateOfBirth: res.dateOfBirth,
          address: res.address
        }
        const dateOfBirth = new Date(res.dateOfBirth);
        transformData.date = dateOfBirth?.getDate();
        transformData.month = dateOfBirth?.getMonth();
        transformData.year = (dateOfBirth?.getFullYear() + 543);
        delete transformData.dateOfBirth;
        setFormPersonal(transformData);
        setProfileImage(res.profileImage)
      })
        .catch(error => console.log(error));
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setErrorMessage({
      ...errorMessage,
      [inputName]: ''
    })

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

  const onSubmit = async () => {
    if (user) {
      let isValid: boolean = true;
      const newErrorMessage: formDataType = {};
      const submitDataForm = {...formPersonal};

      // if (user?.role === 'customer') {
      //   requiredFieldsCustomer.forEach(key => {
      //     if (!submitDataForm[key]) {
      //       newErrorMessage[key] = errorMessageEmtryField[key];
      //       isValid = false;
      //     }
      //   });
      // }

      if (user?.role === 'freelance') {
        const { date, month, year } = submitDataForm;
        const dateOfBirth = new Date(year - 543, month, date);
        submitDataForm['dateOfBirth'] = dateOfBirth;
        requiredFieldsFreelancePersonalUpdate.forEach(key => {
          if (!submitDataForm[key]) {
            newErrorMessage[key] = errorMessageEmtryField[key];
            isValid = false;
          }
        });
      }

      delete submitDataForm['date'];
      delete submitDataForm['month'];
      delete submitDataForm['year'];

      if (!regexpEmail.test(submitDataForm['email'])) {
        newErrorMessage['email'] = 'กรุณาระบุ e-mail ให้ถูกต้อง'
        isValid = false;
      }

      if (!regexpOnlyNumber.test(submitDataForm['phoneNumber'])) {
        newErrorMessage['phoneNumber'] = 'กรุณาระบุให้ถูกต้อง'
        isValid = false;
      }

      setErrorMessage(newErrorMessage);
      if (isValid) {
        if (profileImageFile) {
          const imageUrls = await uploadFileToFirebase([profileImageFile], `user/profile-image`, user?.username);
          submitDataForm['profileImage'] = imageUrls[0]
        }
        console.log(submitDataForm);
        const headers = getHeaderRequest();
        updatePersonal(user?.id, submitDataForm, headers).then((res) => {
          getFreelanceDetailsInfo();
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
  }

  const getHeaderRequest = () => {
    const token = localStorage.getItem('auth');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return headers
  }

  function generateOptions(start: number, end: number) {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  }

  return (
    <>
      <div>
        {formPersonal && (
          <div>
            <div>
              <h1 className="text-xl font-semibold mb-1">ข้อมูลของฉัน</h1>
              <p className="text-sm text-gray-400">จัดการข้อมูลส่วนตัวคุณเพื่อความปลอดภัยของบัญชีผู้ใช้นี้</p>
            </div>
            <div className={style.form_container}>
              <div className={style.input_box}>
                <div className="mt-8">
                  <p>ชื่อผู้ใช้งาน<span className="ml-4 font-semibold">{user?.username}</span></p>
                </div>
                <div className='grid grid-cols-2 gap-4 my-6'>
                  <div className={style.each_field}>
                    <label htmlFor="">
                      <span>ชื่อ</span>
                    </label>
                    <div>
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={formPersonal.firstname}
                        onChange={(e) => handleInputChange(e)}
                      />
                      <p className={style.error}>{errorMessage.firstname}</p>
                    </div>
                  </div>
                  <div className={style.each_field}>
                    <label htmlFor="">
                      <span>นามสกุล</span>
                    </label>
                    <div>
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={formPersonal.lastname}
                        onChange={(e) => handleInputChange(e)}
                      />
                      <p className={style.error}>{errorMessage.lastname}</p>
                    </div>
                  </div>
                  <div className={style.each_field}>
                    <label htmlFor="">
                      <span>อีเมล</span>
                    </label>
                    <div>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={formPersonal.email}
                        onChange={(e) => handleInputChange(e)}
                      />
                      <p className={style.error}>{errorMessage.email}</p>
                    </div>
                  </div>
                  <div className={style.each_field}>
                    <label htmlFor="">
                      <span>เบอร์โทรศัพท์</span>
                    </label>
                    <div>
                      <input
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={formPersonal.phoneNumber}
                        onChange={(e) => handleInputChange(e)}
                      />
                      <p className={style.error}>{errorMessage.phoneNumber}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className={style.dateOfBirth}>
                    <div className="mr-6">วัน เดือน ปี</div>
                    <div className={style.date}>
                      <select
                        onChange={(e) => handleInputChange(e)}
                        value={formPersonal.date}
                        id="date"
                        name="date"
                      >
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
                        {generateOptions(2460, 2549)}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  {/* <label htmlFor=""> */}
                  <div className={style.each_field}>
                    <p className="mr-5">ที่อยู่ปัจจุบัน</p>
                    <div>
                      <textarea
                        name="address"
                        id="address"
                        cols={50}
                        rows={8}
                        value={formPersonal.address}
                        onChange={(e) => handleInputChange(e)}
                      ></textarea>
                      <p className={style.error}>{errorMessage.address}</p>
                    </div>
                  </div>
                  {/* </label> */}
                </div>
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
                    <p>File size: maximum 1MB</p>
                    <p>File extension: .JPEG, .PNG, .GIF</p>
                  </div>
                </div>
              </div>

            </div>
            <div>
              <div className={style.button}>
                <div className="flex justify-center">
                  <button className={style.submit} onClick={() => onSubmit()}>
                    Save
                  </button>
                  <button className={style.cancel}>Cancel</button>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PersonalUpdateForm;
