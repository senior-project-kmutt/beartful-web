import { Artwork } from "@/models/artwork";
import { getArtwork } from "@/services/artwork/artwork.api";
import { useEffect, useState } from "react";
import style from "@/styles/artwork/artworkLayout.module.scss";
import ArtworkItem from "./ArtworkItem";

const Artwork = () => {
  const [artwork, setArtwork] = useState<Artwork[]>();
  useEffect(() => {
    getArtwork().subscribe((res) => {
      setArtwork(res.data);
    });
  }, []);
  return (
    <div className={style.artwork_container}>
      {artwork?.map((item) => {
        return (
          <>
            <ArtworkItem item={item} />
          </>
        );
      })}
    </div>
  );
};

export default Artwork;
