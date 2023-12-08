import { Artwork } from "@/models/artwork";
import style from "@/styles/artwork/artworkLayout.module.scss";
import { Dispatch, SetStateAction } from "react";
interface Props {
  type: string
  setType: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
  setArtwork: Dispatch<SetStateAction<Artwork[]>>;
  setHasMore: Dispatch<SetStateAction<boolean>>;
  setIsShowDetail: Dispatch<SetStateAction<boolean>>;
}

const ArtworkCategory = (props: Props) => {
  const { setType, setPage, setArtwork, setHasMore, setIsShowDetail, type } = props

  const setTypeArtwork = (typeAW: string) => {
    if (type != typeAW) {
      setArtwork([])
      setType(typeAW)
      setPage(1)
      setHasMore(true)
      setIsShowDetail(false)
    }
  }
  return (
    <div className={style.artwork_category}>
      <div className={style.warp}>
        <div className={style.switch}>
          <div className={type === 'hired' ? `${style.item_active}` : `${style.item}`} onClick={() => setTypeArtwork('hired')}>Hiring</div>
          <div className={type === 'readyMade' ? `${style.item_active}` : `${style.item}`} onClick={() => setTypeArtwork('readyMade')}>Ready Made</div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCategory;
