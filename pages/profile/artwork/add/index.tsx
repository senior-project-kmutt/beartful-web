import ArtworkForm from "@/components/Profile/Freelance/Artwork/ArtworkAddForm";
import { IUser } from "@/pages/chat";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const CreateArtwork: React.FC = () => {
    const [user, setUser] = useState<IUser>();
    const router = useRouter()

    useEffect(() => {
        const userFromSession = localStorage.getItem('user');
        const user = userFromSession ? JSON.parse(userFromSession) : null;
    
        if (!user || user.role !== 'freelance') {
            router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/`);
        } else {
            setUser(user);
        }
    }, []);

    return (
        <ArtworkForm user={user} />
    );
};

export default CreateArtwork;