import { Category } from "@/models/category";
import { createArtwork } from "@/services/artwork/artwork.api";
import { getAllCategories } from "@/services/category/category.api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { firebaseConfig } from '@/config/firebase.config';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { IUser } from "@/pages/chat";
import style from "@/styles/profile/freelance/artwork/artworkForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NavBar from "@/components/Layout/NavBar";
import ProfileSelectBarFreelance from "@/components/Profile/Freelance/ProfileSelectBar";
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
  user: IUser | undefined
}

const ArtworkForm = (props: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ArtworkFormData>();
  const { user } = props
  const [categories, setCategories] = useState<Category[]>([]);
  const [inputFiles, setInputFiles] = useState<File[]>([]);
  const [imageSrc, setImageSrc] = useState<string[] | ArrayBuffer[] | null>([]);
  initializeApp(firebaseConfig);

  useEffect(() => {
    getAllCategories().subscribe((res => {
      setCategories(res.data as Category[])
    }))
  }, [])

  const uploadFileToFirebase = async () => {
    const imagesUrl: string[] = [];
    const storage = getStorage();

    for (let i = 0; i < inputFiles.length; i++) {
      const file = inputFiles[i];
      const storageRef = ref(storage, `artwork/${user?.username}/${file.name}`);
      const snapshot = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      imagesUrl.push(downloadURL);
    }

    return imagesUrl;
  };


  const handleFileChange = (e: any) => {
    const files = e.target.files;
    const newImageSrcArray: any = [];

    for (let index = 0; index < files.length; index++) {
      const item = files[index];

      if (item) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImageSrcArray.push(reader.result);
          setImageSrc(newImageSrcArray);
        };

        reader.readAsDataURL(item);
      }
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const token = localStorage.getItem("auth");
    let imageUrl: String[] = [];
    if (token) {
      if (inputFiles) {
        imageUrl = await uploadFileToFirebase();
      }

      if (user) {
        const artwork = { ...data, images: imageUrl };
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        try {
          createArtwork(artwork, headers).subscribe((res: any) => {
            Swal.fire({
              icon: "success",
              title: "สร้างผลงานสำเร็จ",
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
            } else {
              Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: "โปรดลองใหม่อีกครั้ง",
                icon: "error"
              });
            }
          });
        } catch (error) {
          console.error("Error creating artwork:", error);
        }
      }
    }
  });

  return (
    <>
      <NavBar />
      <div className="flex">

        <div style={{width: '18%'}}>
          <ProfileSelectBarFreelance activeMenu="artwork" />
        </div>

        <div id="add_artwork" className={style.main}>
          <form onSubmit={onSubmit}>
            <div>
              <label>เพิ่มผลงาน</label>
              <div className={style.insertArtwork}>
                {imageSrc?.map((item: any, index: number) => {
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

                <label htmlFor="fileInput" className={style.customFileInput}>
                  <div className={style.customContainer}>
                    <FontAwesomeIcon icon={faPlus} size="2xl" style={{ color: '#545151' }}></FontAwesomeIcon>
                  </div>
                  <input
                    id="fileInput"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e: any) => {
                      setInputFiles([...e.target.files]);
                      handleFileChange(e)
                    }}
                  />
                </label>
              </div>
            </div>
            <div className={style.formGrid}>

              <label>ชื่อผลงาน</label>
              <div>
                <input className={style.inputField} {...register("name", { required: "กรุณากรอกชื่อผลงาน" })} />
                {errors?.name && <span className={style.errorMessage}>*{errors.name.message}</span>}

              </div>

              <label>ประเภท</label>
              <select className={style.inputFieldSm} {...register("type")}>
                <option value="hired">hired</option>
                <option value="readyMade">readyMade</option>
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
                <input className={style.inputField} {...register("description", { required: "กรุณากรอกรายละเอียด" })} />
                {errors?.description && <span className={style.errorMessage}>*{errors.description.message}</span>}

              </div>

              <label>ราคา</label>
              <div>
                <input className={style.inputFieldSm} {...register("price", { required: "กรุณากรอกราคา" })} /><span> บาท</span>
                {errors?.price && <p className={style.errorMessage}>*{errors.price.message}</p>}
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