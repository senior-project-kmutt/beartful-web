import { LoginUser } from "@/models/users";
import { login } from "@/services/user/user.api";
import bcrypt from "bcryptjs";

interface formDataType {
  [key: string]: any;
}
const Login = () => {
  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const responseBody: formDataType = {};
    const formData = new FormData(event.currentTarget as HTMLFormElement);

    for (const [property, value] of formData) {
      responseBody[property] = value;
    }

    if (responseBody) {
      login(responseBody as unknown as LoginUser);
    }
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <h1>Login</h1>
        <label>
          Username:
          <input name="username" type="text" />
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

export default Login;
