import { Artwork } from "@/models/artwork";
import { getArtwork } from "@/services/artwork/artwork.api";
import { useEffect, useState } from "react";
import style from "@/styles/artwork/artworkLayout.module.scss";
import ArtworkItem from "./ArtworkItem";
import ArtworkCategory from "./ArtworkCategory";
import ArtworkDetail from "./ArtworkDetail";

const Artwork = () => {
  const [artwork, setArtwork] = useState<Artwork[]>();
  const [artworkDetail, setArtworkDetail] = useState<Artwork>();
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);

  useEffect(() => {
    getArtwork().subscribe((res) => {
      setArtwork(res.data);
    });
  }, []);

  const onShowDetail = (item: Artwork) => {
    setIsShowDetail(true);
    setArtworkDetail(item);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    },);
  };

  const onCloseDetail = () => {
    setIsShowDetail(false);
  };

  return (
    <div className="flex">
      <ArtworkCategory />
      <div className={style.container}>
        {isShowDetail && artworkDetail && (
          <ArtworkDetail item={artworkDetail} onCloseDetail={onCloseDetail} />
        )}
        <div className={style.artwork_container}>
          {artwork?.map((item, index) => {
            return (
              <ArtworkItem
                item={item}
                key={index}
                onShowDetail={onShowDetail}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Artwork;
