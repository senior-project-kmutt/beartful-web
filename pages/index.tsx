import { testApi } from "@/services/TestApi"
import { useEffect, useState } from "react"
import axios from "axios";
import { API_URL } from "@/config/constants";
import Artwork from "@/components/Artwork/Artwork";
import NavBar from "@/components/Layout/NavBar"

const client = axios.create({
  baseURL: API_URL
});


export default function Home() {
  const [user, setUser] = useState<string>()

  useEffect(() => {
    testApi().subscribe((res:any) => {
      setUser(res.data.name)
    })
  }, [])

  return (
    <>
      <h1>Hello</h1>
      <NavBar />
      <Artwork />
    </> 
  );
}
