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
  address: string;
  education: Array<IUserEducation[]>;
  experience?: Array<IUserExperience[]>;
  skill?: Array<IUserSkillAndLanguage[]>;
  language?: Array<IUserSkillAndLanguage[]>;
  award?: Array<IUserAward[]>;
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
  bankAccountImage: string
}
