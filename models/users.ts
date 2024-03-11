export interface Users {
  email: string;
  password: string;
  username: string;
  firstname: string;
  lastname: string;
  profileImage: string;
  role: string;
  phoneNumber: string
  createdAt: Date
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface FreelanceUsers extends Users {
  dateOfBirth: Date;
  address: string;
  education: IUserEducation[];
  experience?: IUserExperience[];
  skill?: IUserSkillAndLanguage[];
  language?: IUserSkillAndLanguage[];
  award?: IUserAward[];
  bankAccount: IUserBankAccount;
}

interface IUserEducation {
  degree: string;
  institution: string;
  major: string
}

interface IUserExperience {
  companyName: string;
  position: string;
  isCurrentJob: string;
  monthStartJob: string;
  yearStartJob: string;
  monthEndJob?: string;
  yearEndJob?: string
}

interface IUserSkillAndLanguage {
  type: string;
  title: string;
  level: string;
}

interface IUserAward {
  title: string;
  description: string;
}

interface IUserBankAccount {
  bankName: string;
  bankAccountNumber: string;
  bankAccountImage: string;
  bankAccountName: string;
}

export interface ITransaction {
  _id: string;
  type: string;
  omiseTransactionId: string;
  amount: number;
  freelanceId: string;
  createdAt: Date;
}

export interface UserDashboard {
  recipientId: string;
  amount: number;
  bankAccount: IUserBankAccount;
  transaction: ITransaction[];
}
