export interface Users {
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
  profile_image: string;
  role: string
}

export interface LoginUser {
  username: string;
  password: string;
}
