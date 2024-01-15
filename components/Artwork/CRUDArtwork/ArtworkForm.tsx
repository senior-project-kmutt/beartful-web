import { Category } from "@/models/category";
import { createArtwork } from "@/services/artwork/artwork.api";
import { getAllCategories } from "@/services/category/category.api";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { firebaseConfig } from '@/config/firebase.config';
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { IUser } from "@/pages/chat";

export type ArtworkFormData = {
  images: String[]
  name: string
  description: string
  price: string
  type: string
  categoryId: string[];
};

const ArtworkForm = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<ArtworkFormData>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [inputFiles, setInputFiles] = useState<File[]>([]);
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
      <div>
        <form onSubmit={onSubmit}>
          <label>Name</label>
          <input {...register("name")} />
          <label>Description</label>
          <input {...register("description")} />
          <label>Price</label>
          <input {...register("price")} />
          <select {...register("type")}>
            <option value="hired">hired</option>
            <option value="readyMade">readyMade</option>
          </select>

          <label>Select Categories:</label>
          {categories.map((item) => (
            <div key={item._id}>
              <input
                type="checkbox"
                id={`category-${item._id}`}
                value={item._id}
                {...register('categoryId')}
              />
              <label htmlFor={`category-${item._id}`}>{item.name}</label>
            </div>
          ))}

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e: any) => {
              setInputFiles([
                ...e.target.files
              ])
            }}
          />
          <input type="submit" />
        </form>


      </div>
    </>
  );
};

export default ArtworkForm;