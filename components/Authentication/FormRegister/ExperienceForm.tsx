import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import style from "@/styles/authentication/form/experienceForm.module.scss";
import { thaiMonths } from './option';

export interface ExperienceItem {
  companyName: string;
  position: string;
  monthStartJob: string;
  yearStartJob: string;
  isCurrentJob: boolean;
  monthEndJob?: string;
  yearEndJob?: string
}

type ValidateEducationItem = {
  [key: string | number]: boolean;
};

interface Props {
  saveFormRegister: Dispatch<SetStateAction<ExperienceItem[]>>
  defaultFormData: ExperienceItem[];
  setIsFormValid: Dispatch<SetStateAction<boolean>>;
  isHideButton?: boolean;
  isSaveForm?: boolean
}

const ExperienceForm = (props: Props) => {
  const { saveFormRegister, defaultFormData, setIsFormValid, isHideButton, isSaveForm } = props;
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [validateFields, setValidateFields] = useState<ValidateEducationItem[]>([]);

  useEffect(() => {
    setIsFormValid(false);
    if (defaultFormData) {
      setExperiences(defaultFormData);
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

  useEffect(() => {
    if (isSaveForm) {
      onSubmit();
    }
  }, [isSaveForm])

  const addEducation = () => {
    setExperiences([
      ...experiences,
      {
        companyName: '',
        position: '',
        monthStartJob: '',
        yearStartJob: '',
        isCurrentJob: false,
        monthEndJob: '',
        yearEndJob: ''
      }
    ]);

    setValidateFields([
      ...validateFields,
      {
        companyName: true,
        position: true,
        monthStartJob: true,
        yearStartJob: true,
        monthEndJob: true,
        yearEndJob: true
      }
    ])
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>, index: number) => {
    const inputField = event.target.name;
    const isCheckbox = event.target.type === 'checkbox'
    let inputValue: string | boolean;

    if (isCheckbox) {
      inputValue = (event.target as HTMLInputElement).checked;
    } else {
      inputValue = event.target.value;
    }

    setExperiences(
      experiences.map((experience, i) => {
        const updateExperience = experience
        if (isCheckbox) {
          if (inputValue) {
            delete updateExperience['monthEndJob']
            delete updateExperience['yearEndJob']
          } else {
            updateExperience['monthEndJob'] = ''
            updateExperience['yearEndJob'] = ''
          }
        }
        return i === index ? { ...updateExperience, [inputField]: inputValue } : experience
      }
      )
    );

    setValidateFields(
      validateFields.map((item, i) => {
        if (isCheckbox) {
          if (inputValue) {
            const { monthEndJob, yearEndJob,  ...updatedItem } = item;
            return updatedItem;
          } else {
            return { ...item, monthEndJob: true, yearEndJob: true };
          }
        }
        return i === index ? { ...item, [inputField]: true } : item;
      })
    );
  };


  const handleDelete = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    const newValidateFields = validateFields.filter((_, i) => i !== index);
    setExperiences(newExperiences);
    setValidateFields(newValidateFields);
  };


  const onSubmit = () => {
    const updatedValidateFields = experiences.map((item) => {
      const validateItem: ValidateEducationItem = {};

      for (const [property, value] of Object.entries(item)) {
        if (property !== 'isCurrentJob') {
          validateItem[property] = value.trim() !== '';
        }
      }

      return validateItem;
    });

    setValidateFields(updatedValidateFields);

    const isValid = updatedValidateFields.every((validateItem) =>
      Object.values(validateItem).every(Boolean)
    );

    if (isValid) {
      saveFormRegister(experiences)
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  };

  function generateOptions(start: number, end: number) {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  }


  return (
    <div>
      <p className='text-xl font-semibold'>ประสบการณ์การทำงาน</p>
      {experiences.map((experience, index) => (
        <div key={index}>
          <div className={style.education_box}>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label>
                  <div>
                    <p>ชื่อบริษัท</p>
                  </div>
                  <input
                    value={experience.companyName}
                    type="text"
                    name="companyName"
                    onChange={(e) => handleChange(e, index)}
                    className={`${!validateFields[index].companyName && `${style.error}`}`}
                  />
                </label>
              </div>
              <div>
                <label>
                  <div>
                    <p>ตำแหน่ง</p>
                  </div>
                  <input
                    value={experience.position}
                    type="text"
                    name="position"
                    onChange={(e) => handleChange(e, index)}
                    className={`${!validateFields[index].position && `${style.error}`}`}
                  />
                </label>
              </div>
              <div>
                <label>
                  <div>
                    <p>เดือนที่เริ่มทำงาน</p>
                  </div>
                  <select
                    value={experience.monthStartJob}
                    onChange={(e) => handleChange(e, index)}
                    name="monthStartJob"
                    className={`${!validateFields[index].monthStartJob && `${style.error}`}`}
                  >
                    <option value='' selected disabled>- กรุณาเลือก -</option>
                    {thaiMonths.map((month, index) => {
                      return (
                        <option key={index} value={month}>{month}</option>
                      )
                    })}
                  </select>
                </label>
              </div>
              <div>
                <label>
                  <div>
                    <p>ปีที่เริ่มทำงาน</p>
                  </div>
                  <select
                    value={experience.yearStartJob}
                    onChange={(e) => handleChange(e, index)}
                    name="yearStartJob"
                    className={`${!validateFields[index].yearStartJob && `${style.error}`}`}
                  >
                    <option value='' selected disabled>- กรุณาเลือก -</option>
                    {generateOptions(2460, 2564)}
                  </select>
                </label>
              </div>
            </div>
            <div className='flex mt-6'>
              <input
                type="checkbox"
                name="isCurrentJob"
                checked={experience.isCurrentJob}
                onChange={(e) => handleChange(e, index)}
                className={`${!validateFields[index].institution && `${style.error}`}`}
              />
              <label className='ml-2' htmlFor="currentJob">ที่ทำงานปัจจุบัน</label>
            </div>
            {!experience.isCurrentJob && (
              <div className='grid grid-cols-2 gap-4 mt-5'>
                <div>
                  <label>
                    <div>
                      <p>เดือนที่สิ้นสุด</p>
                    </div>
                    <select
                      value={experience.monthEndJob}
                      onChange={(e) => handleChange(e, index)}
                      name="monthEndJob"
                      className={`${!validateFields[index].monthEndJob && `${style.error}`}`}
                    >
                      <option value='' selected disabled>- กรุณาเลือก -</option>
                      {thaiMonths.map((month, index) => {
                        return (
                          <option key={index} value={month}>{month}</option>
                        )
                      })}
                    </select>
                  </label>
                </div>
                <div>
                  <label>
                    <div>
                      <p>ปีที่สิ้นสุด</p>
                    </div>
                    <select
                      value={experience.yearEndJob}
                      onChange={(e) => handleChange(e, index)}
                      name="yearEndJob"
                      className={`${!validateFields[index].yearEndJob && `${style.error}`}`}
                    >
                      <option value='' selected disabled>- กรุณาเลือก -</option>
                      {generateOptions(2460, 2564)}
                    </select>
                  </label>
                </div>
              </div>
            )}
            <div onClick={() => handleDelete(index)} className={style.delete_button}>
              <div>ลบข้อมูล</div>
            </div>
          </div>
        </div>

      ))}
      <div className={style.add_button} onClick={addEducation}>
        + เพิ่มข้อมูล
      </div>
      {!isHideButton && (
        <div className={style.button}>
          <div className="flex justify-center">
            <button className={style.save} onClick={onSubmit}>
              บันทึก
            </button>
            <button className={style.cancel}>ยกเลิก</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;