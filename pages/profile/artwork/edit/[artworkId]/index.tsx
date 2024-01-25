import ArtworkEditForm from "@/components/Artwork/CRUDArtwork/ArtworkEditForm";
import { Artwork } from "@/models/artwork";
import { getArtworkById } from "@/services/artwork/artwork.api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditArtwork = () => {
    const router = useRouter();
    const [artwork, setArtwork] = useState<Artwork>();

    useEffect(() => {
        const artworkId = router.query.artworkId
        if (artworkId) {
            getArtworkById(artworkId as string).subscribe((res => {
                setArtwork(res.data as Artwork)
            }))
        }
    }, [router.query.artworkId])

    return (
        <>
            {artwork && <ArtworkEditForm data={artwork} />}
        </>
    );
};

export default EditArtwork;
