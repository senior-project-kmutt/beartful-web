import { Artwork } from "@/models/artwork";
import style from "@/styles/artwork/artworkLayout.module.scss";
import { Dispatch, SetStateAction } from "react";
interface Props {
  type: string
  setType: Dispatch<SetStateAction<string>>;
  setPage?: Dispatch<SetStateAction<number>>;
  setArtwork?: Dispatch<SetStateAction<Artwork[]>>;
  setHasMore?: Dispatch<SetStateAction<boolean>>;
  setIsShowDetail?: Dispatch<SetStateAction<boolean>>;
}

const ArtworkCategory = (props: Props) => {
  const { setType, setPage, setArtwork, setHasMore, setIsShowDetail, type } = props

  const setTypeArtwork = (typeAW: string) => {
    if (type != typeAW) {
      setType(typeAW)
      // อาจมาลบพวกนี้ออก
      // setArtwork([])
      // setPage(1)
      // setHasMore(true)
      // setIsShowDetail(false)
    }
  }

  return (
    <div className={style.artwork_category}>
      <div className="mx-48 shadow rounded-full h-10 flex p-1 relative items-center">
        <div className={`w-full flex justify-center ${type === 'hired' && `${style.item_active}`}`}>
          <button onClick={() => setTypeArtwork('hired')}>Hiring</button>
        </div>
        <div className={`w-full flex justify-center ${type === 'readyMade' && `${style.item_active}`}`}>
          <button onClick={() => setTypeArtwork('readyMade')}>Ready Made</button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCategory;
