import Artwork from "@/components/Artwork/Artwork";
import FreelanceArtwork from "@/components/Profile/FreelanceArtwork";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

const FreelanceProfile: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const router = useRouter();
    useEffect(() => {
        const user = router.query.profile
        if (user) {
            setUsername(String(user))
        }
    }, [router.query.profile])

    // const getUsername = () => {
    //     return String(router.query.profile)
    // }

    return (
        <>
            {username && (
                <FreelanceArtwork username={username} />
            )}
        </>
    );
};

export default FreelanceProfile;