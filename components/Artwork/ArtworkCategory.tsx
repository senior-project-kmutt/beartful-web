import style from "@/styles/artwork/artworkLayout.module.scss";
import { Dispatch, SetStateAction } from "react";
interface Props {
  type: string
  setType: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
  setHasMore: Dispatch<SetStateAction<boolean>>;
}

const ArtworkCategory = (props: Props) => {
  const { setType, setPage, setHasMore, type } = props
  return (
    <div className={style.artwork_category}>
      <div className={style.warp}>
        <div className={style.switch}>
          <div className={type === 'hired' ? `${style.item_active}` : `${style.item}`} onClick={() => { setType('hired'), setPage(1), setHasMore(true) }}>Hiring</div>
          <div className={type === 'readyMade' ? `${style.item_active}` : `${style.item}`} onClick={() => { setType('readyMade'), setPage(1), setHasMore(true) }}>Ready Made</div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCategory;
