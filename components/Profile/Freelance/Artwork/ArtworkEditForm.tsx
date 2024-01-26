import { Category } from "@/models/category";
import { getAllCategories } from "@/services/category/category.api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { firebaseConfig } from '@/config/firebase.config';
import { initializeApp } from "firebase/app";
import { IUser } from "@/pages/chat";
import { Artwork } from "@/models/artwork";
import style from "@/styles/profile/freelance/artwork/artworkForm.module.scss";
import NavBar from "@/components/Layout/NavBar";
import ProfileSelectBar from "@/components/Profile/Freelance/ProfileSelectBar";
import { editArtwork } from "@/services/artwork/artwork.api";
import Router from 'next/router';

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
  initializeApp(firebaseConfig);

  useEffect(() => {
    getAllCategories().subscribe((res => {
      setCategories(res.data as Category[])
    }))
  }, [])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || ""));
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const token = localStorage.getItem("auth");
    if (token) {
      if (user) {
        const artwork = { ...data };
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        try {
          await editArtwork(props.data._id, artwork, headers);
        } catch (error) {
          console.error("Error edit artwork:", error);
        }
      }
    }
  });

  return (
    <>
      <NavBar />
      <div className="flex">

        <div className={style.sideBar}>
          <ProfileSelectBar />
        </div>

        <div id="edit_artwork" className={style.main}>
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
              <input className={style.inputField} {...register('name', { required: true })} defaultValue={data.name || ''} />

              <label>ประเภท</label>
              <select className={style.inputFieldSm} {...register("type", { required: true })} defaultValue={data.type || ''}>
                <option value="hired">hired</option>
                <option value="readyMade">readyMade</option>
              </select>

              <label>หมวดหมู่</label>
              <div className={style.checkboxGrid}>
                {categories.map((item) => (
                  <div key={item._id} className={style.checkboxItem}>
                    <input
                      className={style.checkboxStyle}
                      type="checkbox"
                      id={`category-${item._id}`}
                      value={item._id}
                      defaultChecked={data.categoryId.includes(item._id)}
                      {...register('categoryId')}
                    />
                    <label className="ml-2" htmlFor={`category-${item._id}`}>{item.name}</label>
                  </div>
                ))}
              </div>

              <label>รายละเอียด</label>
              <input className={style.inputField} {...register("description", { required: true })} defaultValue={data.description || ''} />

              <label>ราคา</label>
              <div>
                <input className={style.inputFieldSm} {...register("price", { required: true })} defaultValue={data.price || ''} /><span> บาท</span>
              </div>

            </div>
            <div className="flex mt-5 ml-60">
              <input type="submit" value="SAVE" className={style.saveButton} />
              <button className={style.cancelButton} onClick={() => Router.back()}>CANCEL</button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default ArtworkForm;

