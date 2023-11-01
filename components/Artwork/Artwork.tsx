import { Artwork } from "@/models/artwork";
import { getArtwork } from "@/services/artwork/artwork.api";
import { useEffect, useState } from "react";
import style from "@/styles/artwork/artworkLayout.module.scss";
import ArtworkItem from "./ArtworkItem";
import ArtworkCategory from "./ArtworkCategory";
import ArtworkDetail from "./ArtworkDetail";

const Artwork = () => {
  const [artwork, setArtwork] = useState<Artwork[]>();
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);

  useEffect(() => {
    getArtwork().subscribe((res) => {
      setArtwork(res.data);
    });
  }, []);
  return (
    <div className="flex">
      <ArtworkCategory />
      <div className={style.container}>
        {true && <ArtworkDetail />}
        <div className={style.artwork_container}>
          {artwork?.map((item) => {
            return (
              <>
                <ArtworkItem item={item} />
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Artwork;
