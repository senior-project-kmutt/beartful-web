import { Category } from "@/models/category";
import { createArtwork } from "@/services/artwork/artwork.api";
import { getAllCategories } from "@/services/category/category.api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { firebaseConfig } from '@/config/firebase.config';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { IUser } from "@/pages/chat";
import { Artwork } from "@/models/artwork";
import style from "@/styles/artwork/artworkForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NavBar from "@/components/Layout/NavBar";

export type ArtworkFormData = {
  images: String[]
  name: string
  description: string
  price: string
  type: string
  categoryId: string[];
};

interface Props {
  data?: Artwork;
}

const ArtworkForm = (props: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ArtworkFormData>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [inputFiles, setInputFiles] = useState<File[]>([]);
  const [imageSrc, setImageSrc] = useState<string[] | ArrayBuffer[] | null>([]);
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

  const uploadFileToFirebase = async () => {
    const imagesUrl: String[] = []
    const storage = getStorage();
    await Promise.all(
      inputFiles.map(async (file) => {
        const storageRef = ref(storage, `artwork/${user?.username}/${file.name}`);
        const snapshot = await uploadBytesResumable(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        imagesUrl.push(downloadURL);
      })
    );
    return imagesUrl;
  }


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
          await createArtwork(artwork, headers);
        } catch (error) {
          console.error("Error creating artwork:", error);
        }
      }
    }
  });

  return (
    <>
      <NavBar />
      <div className="mt-8">
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
            <input className={style.inputField} {...register("name")} />

            <label>ประเภท</label>
            <select className={style.inputFieldSm} {...register("type")}>
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
                    {...register('categoryId')}
                  />
                  <label className="ml-2" htmlFor={`category-${item._id}`}>{item.name}</label>
                </div>
              ))}
            </div>

            <label>รายละเอียด</label>
            <input className={style.inputField} {...register("description")} />

            <label>ราคา</label>
            <div>
              <input className={style.inputFieldSm} {...register("price")} /><span> บาท</span>
            </div>

          </div>
          <div className="flex mt-5 ml-60">
            <input type="submit" value="SAVE" className={style.saveButton} />
            <button className={style.cancelButton}>CANCEL</button>
          </div>

        </form>
      </div>
    </>
  );
};

export default ArtworkForm;