import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import style from "@/styles/authentication/form/experienceForm.module.scss";
import { bankOption } from './option';
import { regexpOnlyNumber } from '@/services/validation';

export interface AccountItem {
  bankName: string;
  bankAccountNumber: string;
  bankAccountImage: File | string | null;
}

interface ValidateAccounting {
  [key: string]: any;
}

interface Props {
  saveFormRegister: Dispatch<SetStateAction<AccountItem>>
  defaultFormData: AccountItem;
  setIsSubmitForm?: Dispatch<SetStateAction<boolean>>
}

const AccountingForm = (props: Props) => {
  const defaultItem = {
    bankName: '',
    bankAccountNumber: '',
    bankAccountImage: null
  }
  const { saveFormRegister, defaultFormData, setIsSubmitForm } = props;
  const [accountInfo, setAccountInfo] = useState<AccountItem>(defaultItem);
  const [errorMessage, setErrorMessage] = useState<ValidateAccounting>({});
  const [imageUpload, setImageUpload] = useState<string>('');
  const [imageUploadFile, setImageUploadFile] = useState<File | null>(null);

  useEffect(() => {
    if (defaultFormData) {
      setAccountInfo(defaultFormData);
      if (setIsSubmitForm) {
        setIsSubmitForm(false);
      }
      
      if (defaultFormData.bankAccountImage) {
        if (typeof defaultFormData.bankAccountImage === "object") {
          const imageSrc = convertFileToBlob(defaultFormData.bankAccountImage);
          setImageUpload(imageSrc);
          setImageUploadFile(defaultFormData.bankAccountImage);

        }
        if (typeof defaultFormData.bankAccountImage === "string") {
          setImageUpload(defaultFormData.bankAccountImage);
          setImageUploadFile(null);
        }
        
      }
    }
  }, [defaultFormData])


  const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const inputField = event.target.name;
    const inputValue = event.target.value;

    setErrorMessage({
      ...errorMessage,
      [inputField]: ''
    })

    setAccountInfo({
      ...accountInfo,
      [inputField]: inputValue
    })
  };

  const handleInputFile = (event: ChangeEvent<HTMLInputElement>) => {
    setErrorMessage({
      ...errorMessage,
      bankAccountImage: ''
    })
    if (event.target.files) {
      const [file] = event.target.files;
      const imageSrc = convertFileToBlob(file)
      setImageUpload(imageSrc);
      setImageUploadFile(file);
    }
  }

  const convertFileToBlob = (file: File) => {
    return URL.createObjectURL(file);
  }


  const onSubmit = async (type: string) => {
    let isValid: boolean = true;
    const newErrorMessage: ValidateAccounting = {};
    const submitDataForm = {...accountInfo};
    if (!accountInfo.bankName) {
      newErrorMessage['bankName'] = 'กรุณาระบุให้ถูกต้อง'
      isValid = false
    }

    if (!accountInfo.bankAccountNumber) {
      newErrorMessage['bankAccountNumber'] = 'กรุณาระบุ'
      isValid = false;
    }

    if (!regexpOnlyNumber.test(accountInfo.bankAccountNumber)) {
      newErrorMessage['bankAccountNumber'] = 'กรุณาระบุให้ถูกต้อง'
      isValid = false;
    }

    if (!imageUpload) {
      newErrorMessage['bankAccountImage'] = 'กรุณาอัปโหลดรูปสมุดบัญชี'
      isValid = false;
    }

    setErrorMessage(newErrorMessage)

    if (isValid) {
      if (imageUploadFile !== null) {
        submitDataForm['bankAccountImage'] = imageUploadFile;
      } else {
        submitDataForm['bankAccountImage'] = imageUpload;
      }
      saveFormRegister(submitDataForm);
      if (type === 'submit' && setIsSubmitForm) {
        setIsSubmitForm(true)
      }
    }
  };
  
  return (
    <div>
      <p className='text-xl font-semibold'>ข้อมูลบัญชีและการเงิน</p>
      <div className={style.education_box}>
        <div>
          <div>
            <label>
              <div>
                <p>ธนาคาร</p>
              </div>
              <select
                value={accountInfo.bankName}
                onChange={(e) => handleChange(e)}
                name="bankName"
                className={`${errorMessage.bankName && `${style.error}`}`}
              >
                <option value='' selected disabled>- กรุณาเลือก -</option>
                {bankOption.map((bank, index) => {
                  return (
                    <option key={index} value={bank.value}>{bank.title}</option>
                  )
                })}

              </select>
            </label>
          </div>
          <div className='mt-4'>
            <label>
              <div>
                <p>เลขบัญชีธนาคาร</p>
              </div>
              <input
                value={accountInfo.bankAccountNumber}
                type="text"
                name="bankAccountNumber"
                onChange={(e) => handleChange(e)}
              />
              <p className={style.error_message}>{errorMessage.bankAccountNumber}</p>
              <p className='text-gray-500 mt-1' style={{ fontSize: 'smaller' }}>เลขบัญชีจะต้องตรงกับหน้าสมุดที่อัปโหลด</p>
            </label>
          </div>
          <div className={style.image_upload}>
            <p>ภาพสมุดบัญชีหน้าแรกที่มีชื่อบัญชีตรงกับชื่อจริงนามสกุล</p>
            <div style={{ fontSize: 'smaller' }}>
              <p className='text-gray-500 mt-1'>อัปโหลดภาพหน้าสมุดบัญชีธนาคาร ถ้าหากเป็นบัญชีเงินฝากแบบไม่มีสมุด ให้อัปโหลดหน้าข้อมูลบัญชีออนไลน์</p>
              <p className='text-gray-500 mt-1'>ในแอปพลิเคชั่น โดยต้องเห็นรายละเอียดชื่อบัญชี เลขบัญชี และชื่อธนาคาร อย่างชัดเจน</p>
            </div>
            <div>
              {imageUpload ? (
                <img className='mt-4 rounded-md' src={imageUpload} alt="" style={{ width: '50%' }} />
              ) : (
                <div className={style.default}></div>
              )}
            </div>
            <input
              id='bankAccountImage'
              type="file"
              name="bankAccountImage"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => handleInputFile(e)}
            />
            <p className={style.error_message}>{errorMessage.bankAccountImage}</p>
            <label htmlFor="bankAccountImage">
              <p>อัปโหลดรูปสมุดบัญชี</p>
            </label>
            <p style={{ fontSize: 'smaller' }} className='text-gray-500 mt-2'>สามารถอัปโหลดเป็นไฟล์ .png .jpg ขนาดไม่เกิน 10MB</p>
          </div>
        </div>
      </div>
      <div className={style.button}>
        <div className="flex justify-center">
          <button className={style.save} onClick={() => onSubmit('save')}>
            Save
          </button>
          {setIsSubmitForm && (
            <button className={style.submit} onClick={() => onSubmit('submit')}>Submit</button>
          )}
          <button className={style.cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AccountingForm;