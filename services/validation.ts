import { FreelanceUsers, Users } from "@/models/users";

export const regexpEmail = new RegExp(/^[\w-.+]+[\w-]+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})$/);
export const regexpOnlyNumber = new RegExp(/^[0-9]*$/);

export const errorMessageEmtryField: Record<string, string> = {
    username: 'กรุณาระบุชื่อผู้ใช้',
    firstname: 'กรุณาระบุชื่อ',
    lastname: 'กรุณาระบุนามสกุล',
    email: 'กรุณาระบุ e-mail',
    phoneNumber: 'กรุณาระบุเบอร์โทรศัพท์',
    password: 'กรุณาระบุรหัสผ่าน',
    confirmPassword: 'กรุณายืนยันรหัสผ่าน',
    dateOfBirth: 'กรุณาเลือก วันที่ เดือน ปี ให้ครบ',
    address: 'กรุณาระบุที่อยู่'
}

export const requiredFieldsCustomer: Array<keyof Users> = [
    'email',
    'username',
    'password',
    'firstname',
    'lastname',
    'role',
    'phoneNumber'
];

export const requiredFieldsFreelancePersonal: Array<keyof FreelanceUsers> = [
    'email',
    'username',
    'password',
    'firstname',
    'lastname',
    'role',
    'phoneNumber',
    'dateOfBirth',
    'address'
];

export const requiredFieldsFreelancePersonalUpdate: Array<keyof FreelanceUsers> = [
    'email',
    'firstname',
    'lastname',
    'phoneNumber',
    'dateOfBirth',
    'address'
];