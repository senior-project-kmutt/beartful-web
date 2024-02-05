import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import style from "@/styles/authentication/form/EducationForm.module.scss";
import { educationLevel } from './option';

export interface EducationItem {
  degree: string;
  institution: string;
  major: string;
}

type ValidateEducationItem = {
  [key: string]: boolean;
};

interface Props {
  saveFormRegister: Dispatch<SetStateAction<EducationItem[]>>
  defaultFormData: EducationItem[];
  setIsFormValid: Dispatch<SetStateAction<boolean>>
}

const EducationForm = (props: Props) => {
  const { saveFormRegister, defaultFormData, setIsFormValid } = props
  const [educations, setEducations] = useState<EducationItem[]>([
    {
      degree: '',
      institution: '',
      major: ''
    },
  ]);

  const [validateFields, setValidateFields] = useState<ValidateEducationItem[]>([
    {
      degree: true,
      institution: true,
      major: true
    },
  ]);

  useEffect(() => {
    setIsFormValid(false)
    if(defaultFormData) {
      setEducations(defaultFormData);
      const updatedValidateFields = defaultFormData.map((item) => {
        const validateItem: ValidateEducationItem = {};
    
        for (const [property, value] of Object.entries(item)) {
          validateItem[property] = true;
        }
    
        return validateItem;
      });
      setValidateFields(updatedValidateFields);

    }
  }, [defaultFormData])

  const addEducation = () => {
    setEducations([...educations, { degree: '', institution: '', major: '' }]);
    setValidateFields([...validateFields, { degree: true, institution: true, major: true }])
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>, index: number) => {
    const inputField = event.target.name;
    const inputValue = event.target.value;

    setValidateFields(
      validateFields.map((item, i) =>
        i === index ? { ...item, [inputField]: true } : item
      )
    );

    setEducations(
      educations.map((education, i) =>
        i === index ? { ...education, [inputField]: inputValue } : education
      )
    );
  };

  const handleDelete = (index: number) => {
    const newEducations = educations.filter((_, i) => i !== index);
    const newValidateFields = validateFields.filter((_, i) => i !== index);
    setEducations(newEducations);
    setValidateFields(newValidateFields);
  };


  const onSubmit = () => {
    const updatedValidateFields = educations.map((item) => {
      const validateItem: ValidateEducationItem = {};
  
      for (const [property, value] of Object.entries(item)) {
        validateItem[property] = value.trim() !== '';
      }
  
      return validateItem;
    });
  
    setValidateFields(updatedValidateFields);
  
    const isValid = updatedValidateFields.every((validateItem) =>
      Object.values(validateItem).every(Boolean)
    );

    if (isValid) {
      saveFormRegister(educations)
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  };


  return (
    <div>
      <p className='text-xl font-semibold'>ข้อมูลประวัติการศึกษา</p>
      {educations.map((education, index) => (
        <div key={index}>
          <div className={style.education_box}>
            <div>
              <label>
                <div>
                  <p>ระดับการศึกษา</p>
                </div>
                <select
                  value={education.degree}
                  onChange={(e) => handleChange(e, index)}
                  name="degree"
                  className={`${!validateFields[index].degree && `${style.error}`}`}
                >
                  <option value='' selected disabled>- กรุณาเลือก -</option>
                  {educationLevel.map((education, index) => {
                    return (
                      <option key={index} value={education.value}>{education.title}</option>
                    )
                  })}
                </select>
              </label>
              <div className={style.info_bottom}>
                <div>
                  <label>
                    <div>
                      <p>ชื่อสถานศึกษา</p>
                    </div>
                    <input
                      value={education.institution}
                      type="text"
                      name="institution"
                      onChange={(e) => handleChange(e, index)}
                      className={`${!validateFields[index].institution && `${style.error}`}`}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    <div>
                      <p>คณะ / สาขาวิชา</p>
                    </div>
                    <input
                      value={education.major}
                      type="text"
                      name="major"
                      onChange={(e) => handleChange(e, index)}
                      className={`${!validateFields[index].major && `${style.error}`}`}
                    />
                  </label>
                </div>
              </div>
            </div>
            {index > 0 && (
              <div onClick={() => handleDelete(index)} className={style.delete_button}>
                <div>ลบข้อมูล</div>
              </div>
            )}
          </div>
        </div>

      ))}
      <div className={style.add_button} onClick={addEducation}>
        + เพิ่มข้อมูล
      </div>
      <div className={style.button}>
        <div className="flex justify-center">
          <button className={style.submit} onClick={onSubmit}>
            Save
          </button>
          <button className={style.cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;