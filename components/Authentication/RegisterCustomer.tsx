import { Users } from "@/models/users";
import { createUser } from "@/services/user/user.api";
import bcrypt from "bcryptjs";
import style from "@/styles/authentication/registerLayout.module.scss";
import { ChangeEvent, useState } from "react";

interface formDataType {
  [key: string]: any;
}
const Register = () => {
  const [profileImage, serProfileImage] = useState<string>("https://i.pinimg.com/564x/40/a4/2f/40a42f4b27a14089b82a916aaff0b298.jpg")
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
    }

  }
  return (
    <div className={style.main}>
      <div className={style.input_field}>
        <div className={style.left}>
          <input type="text" />
        </div>
        <div className={style.right}>
          <input type="text" />
        </div>
      </div>
      <div className={style.upload_image}>
        <img src={profileImage} alt="" />
        <div className={style.input_image}>
          <label htmlFor="profile_image">
            <p>UPLOAD PICTURE</p>
          </label>
          <input
            onChange={handleInputFile}
            id="profile_image"
            type="file"
            accept="image/png, image/gif, image/jpeg" />
        </div>
      </div>
      {/* <form onSubmit={submitForm}>
        <h1>Register</h1>
        <label>
          Email:
          <input name="email" type="email" />
        </label>
        <label>
          Username:
          <input name="username" type="text" />
        </label>
        <label>
          Firstname:
          <input name="firstname" type="text" />
        </label>
        <label>
          Lastname:
          <input name="lastname" type="text" />
        </label>
        <label>
          Password:
          <input name="password" type="text" />
        </label>
        <input type="submit" value="Submit" />
      </form> */}
    </div>
  );
};

export default Register;
