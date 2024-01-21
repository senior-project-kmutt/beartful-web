export interface Users {
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
  profileImage: string;
  role: string;
  phoneNumber: string
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface FreelanceUsers extends Users {
  dateOfBirth: Date;
  address: string
}
