import ArtworkEditForm from "@/components/Profile/Freelance/Artwork/ArtworkEditForm";
import { Artwork } from "@/models/artwork";
import { getArtworkById } from "@/services/artwork/artwork.api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditArtwork = () => {
    const [artwork, setArtwork] = useState<Artwork>();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const urlSearchString = window.location.search;
            const params = new URLSearchParams(urlSearchString);
            const artworkId = params.get('artworkId');
            if (artworkId) {
                getArtworkById(artworkId as string).subscribe((res => {
                    setArtwork(res.data as Artwork)
                }))
            }
        }
    }, []);

    return (
        <>
            {artwork && <ArtworkEditForm data={artwork} />}
        </>
    );
};

export default EditArtwork;
