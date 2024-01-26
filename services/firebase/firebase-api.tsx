import { getPromise, postPromise } from "../HttpClient";
import { IncomingHttpHeaders } from "http";
import { IMassage } from "@/components/Chat/ChatMessage";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/config/firebase.config";

initializeApp(firebaseConfig);

export const uploadFileToFirebase = async (file: File[], path: string, fileName?: string) => {
  const storage = getStorage();

  // Using Promise.all to wait for all uploads to complete
  const uploadPromises = file.map(async (file) => {
    const defaultFileName = file.name;
    const storageRef = ref(storage, `${path}/${fileName ? `${fileName}` : `${defaultFileName}`}`);
    const snapshot = await uploadBytesResumable(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log(downloadURL);
    return downloadURL;
  });

  return Promise.all(uploadPromises);
};