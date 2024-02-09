import { useEffect, useState } from "react";
import { IUser } from "../../chat";
import FreelanceArtwork from "@/components/Profile/Freelance/Artwork/FreelanceArtwork";
import { useRouter } from "next/router";

const ProfileArtwork = () => {
  const [username, setUsername] = useState<string>("");
  const router = useRouter()

  useEffect(() => {
    const userFromSession = localStorage.getItem('user');
    const user = userFromSession ? JSON.parse(userFromSession) : null;

    if (!user || user.role !== 'freelance') {
        router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/`);
    } else {
        setUsername(user.username)
    }
}, []);

  return (
    <>
      {username && (
        <FreelanceArtwork username={username} />
      )}
    </>
  );
};

export default ProfileArtwork;
