import { Artwork } from "@/models/artwork";
import style from "@/styles/user/userSideBar.module.scss";
import { Dispatch, SetStateAction } from "react";
interface Props {
  type: string
  setType: Dispatch<SetStateAction<string>>;
  setPage?: Dispatch<SetStateAction<number>>;
  setArtwork?: Dispatch<SetStateAction<Artwork[]>>;
  setHasMore?: Dispatch<SetStateAction<boolean>>;
  setIsShowDetail?: Dispatch<SetStateAction<boolean>>;
}

const UserSideBar = (props: Props) => {
  const { setType, type } = props

  const setTypeArtwork = (typeAW: string) => {
    if (type != typeAW) {
      setType(typeAW)
    }
  }
  return (
    <div className={style.side_bar}>
      <div className={style.warp}>
        <div className={style.switch}>
            <div className={type === '' ? `${style.item_active}` : `${style.item}`} onClick={() => setTypeArtwork('')}>Portfolio</div>
          <div className={type === 'hired' ? `${style.item_active}` : `${style.item}`} onClick={() => setTypeArtwork('hired')}>Hiring</div>
          <div className={type === 'readyMade' ? `${style.item_active}` : `${style.item}`} onClick={() => setTypeArtwork('readyMade')}>Ready Made</div>
          <div className={type === 'Package&Price' ? `${style.item_active}` : `${style.item}`} onClick={() => setTypeArtwork('Package&Price')}>Package & Price</div>
          <div className={type === 'Review' ? `${style.item_active}` : `${style.item}`} onClick={() => setTypeArtwork('Review')}>Review</div>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
