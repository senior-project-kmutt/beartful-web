import { Category } from "@/models/category";
import { getAllCategories } from "@/services/category/category.api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { firebaseConfig } from '@/config/firebase.config';
import { initializeApp } from "firebase/app";
import { IUser } from "@/pages/chat";
import { Artwork } from "@/models/artwork";
import style from "@/styles/profile/freelance/artwork/artworkForm.module.scss";
import ProfileSelectBarFreelance from "@/components/Profile/Freelance/ProfileSelectBar";
import { editArtwork } from "@/services/artwork/artwork.api";
import Router from 'next/router';
import Swal from "sweetalert2";
import router from "next/router";

export type ArtworkFormData = {
  images: String[]
  name: string
  description: string
  price: string
  type: string
  categoryId: string[];
};

interface Props {
  data: Artwork;
}

const ArtworkForm = (props: Props) => {
  const { data } = props
  const { register, handleSubmit, formState: { errors } } = useForm<ArtworkFormData>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [user, setUser] = useState<IUser>();
  const [priceInputValue, setPriceInputValue] = useState<number>();
  initializeApp(firebaseConfig);

  useEffect(() => {
    calCulateInitialPrice()
    getAllCategories().subscribe((res => {
      setCategories(res.data as Category[])
    }))
  }, [])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || ""));
  }, []);

  const calCulateInitialPrice = () => {
    const calculatedValue = parseFloat(data.price) * 0.9;
    const formattedValue = calculatedValue.toFixed(2);
    setPriceInputValue(parseFloat(formattedValue));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = e.target.value;
    const calculatedValue = parseFloat(price) * 0.9;
    const formattedValue = calculatedValue.toFixed(2);
    setPriceInputValue(parseFloat(formattedValue));
  };

  const onSubmit = handleSubmit(async (data) => {
    const token = localStorage.getItem("auth");
    if (token) {
      if (user) {
        const price = parseFloat(data.price);
        if (price < 20 || price > 150000) {
          Swal.fire({
            title: "ข้อมูลผิดพลาด",
            text: "ราคาต้องอยู่ในช่วง 20-150,000 บาท",
            icon: "warning"
          });
          return;
        }
        const artwork = { ...data };
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        try {
          editArtwork(props.data._id, artwork, headers).subscribe((res: any) => {
            Swal.fire({
              icon: "success",
              title: "แก้ไขผลงานสำเร็จ",
              showConfirmButton: false,
              timer: 1500
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile/artwork`)
              }
            });
          }, error => {
            if (error.response.status === 401) {
              Swal.fire({
                title: "ไม่มีสิทธ์เข้าถึงการดำเนินการนี้",
                icon: "warning"
              })
            } else if (error.response.status === 400) {
              Swal.fire({
                title: "ข้อมูลผิดพลาด",
                text: "โปรดตรวจสอบข้อมูลของคุณ",
                icon: "warning"
              })
            } else if (error.response.status === 404) {
              Swal.fire({
                title: "ไม่พบข้อมูล",
                icon: "warning"
              })
            } else {
              Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: "โปรดลองใหม่อีกครั้ง",
                icon: "error"
              });
            }
          });
        } catch (error) {
          console.error("Error edit artwork:", error);
        }
      }
    }
  });

  return (
    <>
      <div className="fle mt-20">

      <div className="fixed inset-0 bg-white z-3 mt-20 sm:w-1/4 lg:w-1/5 xl:w-1/6">
          <ProfileSelectBarFreelance activeMenu="artwork" />
        </div>

        <div id="edit_artwork"className={`${style.main} fixed mt-32 inset-0 overflow-y-auto mr-12`} style={{ maxHeight: 'calc(100vh - 32px)', zIndex: 20, marginLeft: "350px", marginTop: "120px" }}>
          <form onSubmit={onSubmit}>
            <div>
              <label>แก้ไขผลงาน</label>
              <div className={style.insertArtwork}>
                {data.images.map((item: any, index: number) => {
                  return (
                    <div
                      className={style.imageContainer}
                      key={index}
                    >
                      <img
                        src={item}
                        alt="Selected Image"
                        className={style.image}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <div className={style.formGrid}>

              <label>ชื่อผลงาน</label>
              <div>
                <input className={style.inputField} {...register('name', { required: "กรุณากรอกชื่อผลงาน" })} defaultValue={data.name || ''} />
                {errors?.name && <span className={style.errorMessage}>*{errors.name.message}</span>}
              </div>

              <label>ประเภท</label>
              <select className={style.inputFieldSm} {...register("type", { required: true })} defaultValue={data.type || ''}>
                <option value="hired">Hired</option>
                <option value="readyMade">Ready Made</option>
              </select>

              <label>หมวดหมู่</label>
              <div>
                <div className={style.checkboxGrid}>
                  {categories.map((item) => (
                    <div key={item._id} className={style.checkboxItem}>
                      <input
                        className={style.checkboxStyle}
                        type="checkbox"
                        id={`category-${item._id}`}
                        value={item._id}
                        defaultChecked={data.categoryId.includes(item._id)}
                        {...register('categoryId', { required: "กรุณาเลือกหมวดหมู่ที่ตรงกับผลงานของคุณ" })}
                      />
                      <label className="ml-2" htmlFor={`category-${item._id}`}>{item.name}</label>
                    </div>
                  ))}
                </div>
                {errors?.categoryId && <p className={`${style.errorMessage} mt-2`}>*{errors.categoryId.message}</p>}
              </div>


              <label>รายละเอียด</label>
              <div>
                <input className={style.inputField} {...register("description", { required: "กรุณากรอกรายละเอียด" })} defaultValue={data.description || ''} />
                {errors?.description && <span className={style.errorMessage}>*{errors.description.message}</span>}
              </div>

              {/* <label>ราคา</label>
              <div>
                <input className={style.inputFieldSm} {...register("price", { required: "กรุณากรอกราคา" })} /><span> บาท</span>
                <span className="ml-5 mr-2">จำนวนเงินที่จะได้รับ</span>
                <input
                  className={style.inputFieldSmall}
                  disabled={true}
                  value={handlePriceChange(data.price)}
                />
                <span> บาท</span>
                <p className={style.information}>*มีการหักค่าบริการระบบ</p>
                {errors?.price && <p className={style.errorMessage}>*{errors.price.message}</p>}
              </div> */}

              <label>ราคา</label>
              <div>
                <input className={style.inputFieldSm} {...register("price", { required: "กรุณากรอกราคา" })} defaultValue={data.price || ''} onChange={handlePriceChange} /><span> บาท</span>
                <span className="ml-5 mr-2">จำนวนเงินที่จะได้รับ</span>
                <input
                  className={style.inputFieldSmall}
                  disabled={true}
                  value={priceInputValue}
                />
                <span> บาท</span>
                <p className={style.information}>*มีการหักค่าบริการระบบ</p>
                {errors?.price && <p className={style.errorMessage}>*{errors.price.message}</p>}
              </div>

            </div>
            <div className="flex mt-5 ml-60">
              <input type="submit" value="บันทึก" className={style.saveButton} />
              <div className={style.cancelButton} onClick={() => Router.back()}>ยกเลิก</div>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default ArtworkForm;

