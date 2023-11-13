import { Users } from "@/models/users";
import { createUser } from "@/services/user/user.api";
import bcrypt from "bcryptjs";

interface formDataType {
  [key: string]: any;
}
const Register = () => {
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
  return (
    <div>
      <form onSubmit={submitForm}>
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
      </form>
    </div>
  );
};

export default Register;
