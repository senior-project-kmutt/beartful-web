import { Users } from "@/models/users";
import { createUser } from "@/services/user/user.api";
import bcrypt from "bcryptjs";
import style from "@/styles/authentication/form/EducationForm.module.scss";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

interface formDataType {
  [key: string]: any;
}

interface Props {
  saveFormRegister?: Dispatch<SetStateAction<any>>;
  setIsFinished?: Dispatch<SetStateAction<boolean>>;
  defaultFormPersonal?: any;
  key: number
}
const EducationItem = (props: Props) => {
  const defaultProfileImage = "https://i.pinimg.com/564x/d8/2c/87/d82c87e21e84a3e7649d16c968105553.jpg";
  const { saveFormRegister, setIsFinished, defaultFormPersonal } = props
  const [profileImage, setProfileImage] = useState<string>(defaultProfileImage);
  const [profileImageFile, setProfileImageFile] = useState<File[]>()
  const [formPersonal, setFormPersonal] = useState<formDataType>({})
  const [errorMessage, setErrorMessage] = useState<formDataType>({})

  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  useEffect(() => {
    if (defaultFormPersonal) {
      defaultFormPersonal.password = ''
      defaultFormPersonal.date = defaultFormPersonal.dateOfBirth?.getDate();
      defaultFormPersonal.month = defaultFormPersonal.dateOfBirth?.getMonth();
      defaultFormPersonal.year = defaultFormPersonal.dateOfBirth?.getYear();
      delete defaultFormPersonal.dateOfBirth;
      setFormPersonal(defaultFormPersonal);
      setProfileImage(defaultFormPersonal.profileImage)
    } else {
      setFormPersonal({
        ...formPersonal,
        profileImage: defaultProfileImage,
        date: 1,
        month: 0,
        year: 4560
      })
    }
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

  const handleInputChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
  }

  const onSubmit = async () => {
  }

  function generateOptions(start: number, end: number) {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  }

  return (
    <div>
      <div className={style.education_box}>
        <div>
          <label>
            <div>
              <p>ระดับการศึกษา</p>
            </div>
            <select
              onChange={(e) => handleInputChange(e)}
              id="role"
              name="role"
            >
              <option value="customer">customer</option>
              <option value="freelance">freelance</option>
            </select>
          </label>
          <div className={style.info_bottom}>
            <div>
              <label>
                <div>
                  <p>ชื่อสถานศึกษา</p>
                </div>
                <input type="text" />
              </label>
            </div>
            <div>
              <label>
                <div>
                  <p>คณะ / สาขาวิชา</p>
                </div>
                <input type="text" />
              </label>
            </div>
          </div>
        </div>
        <div className={style.delete_button}>
          <div>ลบข้อมูล</div>
        </div>
      </div>
    </div>
  );
};

export default EducationItem;
