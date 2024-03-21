import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import style from "@/styles/authentication/form/experienceForm.module.scss";
import { skillAndLanguageLevel, skillAndLanguageOption } from './option';

export interface SkillAndLanguageItem {
  type: string;
  title: string;
  level: string;
}

type ValidateSkillLanguageItem = {
  [key: string]: boolean;
};

interface Props {
  saveFormRegister: Dispatch<SetStateAction<SkillAndLanguageItem[]>>
  defaultFormData: SkillAndLanguageItem[];
  setIsFormValid: Dispatch<SetStateAction<boolean>>;
  isHideButton?: boolean;
  isSaveForm?: boolean
}

const SkillLanguageForm = (props: Props) => {
  const { saveFormRegister, defaultFormData, setIsFormValid, isHideButton, isSaveForm } = props;
  const [skillAndLanguages, setSkillAndLanguages] = useState<SkillAndLanguageItem[]>([]);
  const [validateFields, setValidateFields] = useState<ValidateSkillLanguageItem[]>([]);

  useEffect(() => {
    setIsFormValid(false);
    if (defaultFormData) {
      setSkillAndLanguages(defaultFormData);
      const updatedValidateFields = defaultFormData.map((item) => {
        const validateItem: ValidateSkillLanguageItem = {};

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
    setSkillAndLanguages([
      ...skillAndLanguages,
      {
        type: '',
        title: '',
        level: ''
      }
    ]);

    setValidateFields([
      ...validateFields,
      {
        type: true,
        title: true,
        level: true
      }
    ])
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>, index: number) => {
    const inputField = event.target.name;
    const inputValue = event.target.value;

    setValidateFields(
      validateFields.map((item, i) =>
        i === index ? { ...item, [inputField]: true } : item
      )
    );

    setSkillAndLanguages(
      skillAndLanguages.map((item, i) =>
        i === index ? { ...item, [inputField]: inputValue } : item
      )
    );
  };


  const handleDelete = (index: number) => {
    const newSkillAndLanguage = skillAndLanguages.filter((_, i) => i !== index);
    const newValidateFields = validateFields.filter((_, i) => i !== index);
    setSkillAndLanguages(newSkillAndLanguage);
    setValidateFields(newValidateFields);
  };

  const onSubmit = () => {
    const updatedValidateFields = skillAndLanguages.map((item) => {
      const validateItem: ValidateSkillLanguageItem = {};

      for (const [property, value] of Object.entries(item)) {
        validateItem[property] = property === 'level' ? !!value : !!value.trim();
      }

      return validateItem;
    });

    setValidateFields(updatedValidateFields);

    const isValid = updatedValidateFields.every((validateItem) =>
      Object.values(validateItem).every(Boolean)
    );

    if (isValid) {
      saveFormRegister(skillAndLanguages)
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  };

  return (
    <div>
      <p className='text-xl font-semibold'>ทักษะความสามารถและภาษา</p>
      {skillAndLanguages.map((item, index) => (
        <div key={index}>
          <div className={style.education_box}>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label>
                  <div>
                    <p>ประเภท</p>
                  </div>
                  <select
                    value={item.type}
                    onChange={(e) => handleChange(e, index)}
                    name="type"
                    className={`${!validateFields[index].type && `${style.error}`}`}
                  >
                    <option value='' selected disabled>- กรุณาเลือก -</option>
                    {skillAndLanguageOption.map((menu, index) => {
                      return (
                        <option key={index} value={menu.value}>{menu.title}</option>
                      )
                    })}
                  </select>
                </label>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4 mt-6'>
              <div>
                <label>
                  <div>
                    <p>ระบุทักษะ / ภาษา</p>
                  </div>
                  <input
                    value={item.title}
                    type="text"
                    name="title"
                    onChange={(e) => handleChange(e, index)}
                    className={`${!validateFields[index].title && `${style.error}`}`}
                  />
                </label>
              </div>
              <div>
                <label>
                  <div>
                    <p>ระดับความเชี่ยวชาญ</p>
                  </div>
                  <select
                    value={item.level}
                    onChange={(e) => handleChange(e, index)}
                    name="level"
                    className={`${!validateFields[index].level && `${style.error}`}`}
                  >
                    <option value='' selected disabled>- กรุณาเลือก -</option>
                    {skillAndLanguageLevel.map((menu, index) => {
                      return (
                        <option key={index} value={menu.value}>{menu.title}</option>
                      )
                    })}
                  </select>
                </label>
              </div>

            </div>
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

export default SkillLanguageForm;