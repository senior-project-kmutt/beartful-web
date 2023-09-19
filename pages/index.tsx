import { testApi } from "@/services/TestApi"
import { useEffect, useState } from "react"

export default function Home() {
  const [user, setUser] = useState<string>()

  useEffect(() => {
    testApi().subscribe((res:any) => {
      setUser(res.data.name)
    })
  }, [])

  return (
      <div className="m-4">
        <h1>Homepage</h1>
        <p>Username : {user}</p>
      </div>
  )
}
