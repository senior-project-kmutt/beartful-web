import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import style from "@/styles/authentication/form/experienceForm.module.scss";

export interface AwardItem {
  title: string;
  description: string;
}

type ValidateAwardItem = {
  [key: string]: boolean;
};

interface Props {
  saveFormRegister: Dispatch<SetStateAction<AwardItem[]>>
  defaultFormData: AwardItem[];
  setIsFormValid: Dispatch<SetStateAction<boolean>>;
  isHideButton?: boolean;
  isSaveForm?: boolean
}

const AwardForm = (props: Props) => {
  const { saveFormRegister, defaultFormData, setIsFormValid, isHideButton, isSaveForm } = props;
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [validateFields, setValidateFields] = useState<ValidateAwardItem[]>([]);

  useEffect(() => {
    setIsFormValid(false);
    if (defaultFormData) {
      setAwards(defaultFormData);
      const updatedValidateFields = defaultFormData.map((item) => {
        const validateItem: ValidateAwardItem = {};

        for (const [property, value] of Object.entries(item)) {
          if (property !== 'description') {
            validateItem[property] = true;
          }
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
    setAwards([
      ...awards,
      {
        title: '',
        description: ''
      }
    ]);

    setValidateFields([
      ...validateFields,
      {
        title: true
      }
    ])
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    const inputField = event.target.name;
    const inputValue = event.target.value;

    setValidateFields(
      validateFields.map((item, i) =>
        i === index ? { ...item, [inputField]: true } : item
      )
    );

    setAwards(
      awards.map((item, i) =>
        i === index ? { ...item, [inputField]: inputValue } : item
      )
    );
  };


  const handleDelete = (index: number) => {
    const newAward = awards.filter((_, i) => i !== index);
    const newValidateFields = validateFields.filter((_, i) => i !== index);
    setAwards(newAward);
    setValidateFields(newValidateFields);
  };

  const onSubmit = () => {
    const updatedValidateFields = awards.map((item) => {
      const validateItem: ValidateAwardItem = {};

      for (const [property, value] of Object.entries(item)) {
        if (property !== 'description') {
          validateItem[property] = !!value.trim();
        }
      }

      return validateItem;
    });

    setValidateFields(updatedValidateFields);

    const isValid = updatedValidateFields.every((validateItem) =>
      Object.values(validateItem).every(Boolean)
    );

    if (isValid) {
      saveFormRegister(awards)
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  };

  return (
    <div>
      <p className='text-xl font-semibold'>ใบอนุญาติ / รางวัลที่ได้รับ</p>
      {awards.map((item, index) => (
        <div key={index}>
          <div className={style.education_box}>
            <div className=''>
              <div>
                <label>
                  <div>
                    <p>ชื่อรางวัล</p>
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
              <div className='mt-4'>
                <label>
                  <div>
                    <p>รายละเอียดเพิ่มเติม</p>
                  </div>
                  <textarea
                    value={item.description}
                    name="description"
                    onChange={(e) => handleChange(e, index)}
                    // className={`${!validateFields[index].description && `${style.error}`}`}
                  />
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

export default AwardForm;