import { useEffect, useState } from "react";
import { IUser } from "../../chat";
import FreelanceArtwork from "@/components/Profile/Freelance/Artwork/FreelanceArtwork";

const ProfileArtwork = () => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const user: IUser = JSON.parse(localStorage.getItem('user') || '');
    setUsername(user.username)
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
