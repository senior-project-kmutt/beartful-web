import Artwork from "@/components/Artwork/Artwork";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";

const FreelanceProfile: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const router = useRouter();
    useEffect(() => {
        setUsername(String(router.query.profile))
    }, [router.query.profile])

    // const getUsername = () => {
    //     return String(router.query.profile)
    // }

    return (
        <Artwork username={username} />
    );
};

export default FreelanceProfile;