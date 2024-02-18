import FreelanceArtwork from "@/components/User/FreelanceArtwork";
import { useEffect, useState } from "react";

const FreelanceProfile: React.FC = () => {
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        if (typeof window !== 'undefined') {
          const urlSearchString = window.location.search;
          const params = new URLSearchParams(urlSearchString);
          const username = params.get('username');
          setUsername(username || '')
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

export default FreelanceProfile;



