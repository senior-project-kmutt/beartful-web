import axios from "axios";
import { API_URL } from "@/config/constants";
import Artwork from "@/components/Artwork/Artwork";
import NavBar from "@/components/Layout/NavBar";
import { useEffect, useState } from "react";
import { IUser } from "./chat";
import { useRouter } from "next/router";

const client = axios.create({
  baseURL: API_URL
});

export default function Home() {
  const [user, setUser] = useState<IUser>();
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (user?.role === 'admin') {
      router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/admin`)
    }
  }, [user]);
  return (
    <>
      <NavBar />
      <Artwork />
    </>
  );
}
