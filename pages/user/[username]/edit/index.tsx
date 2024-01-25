import ArtworkForm from "@/components/Artwork/CRUDArtwork/ArtworkForm";
import { useRouter } from "next/router";
import { useEffect } from "react";

const EditArtwork = () => {

    useEffect(()=>{
        const router = useRouter();
    })
    return (
        <ArtworkForm />
    );
};

export default EditArtwork;