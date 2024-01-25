import FreelanceArtwork from "@/components/Profile/Freelance/Artwork/FreelanceArtwork";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const FreelanceProfile: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const router = useRouter();
    useEffect(() => {
        const user = router.query.username
        if (user) {
            setUsername(String(user))
        }
    }, [router.query.username])

    return (
        <>
            {username && (
                <FreelanceArtwork username={username} />
            )}
        </>
    );
};

export default FreelanceProfile;