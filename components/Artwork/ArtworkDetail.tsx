import { Artwork } from "@/models/artwork";
import style from "@/styles/artwork/artworkLayout.module.scss";
import { Carousel, CustomFlowbiteTheme } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import router from "next/router";
import { deleteArtwork } from "@/services/artwork/artwork.api";

interface Props {
  item: Artwork;
  onCloseDetail: () => void;
  isProfileEditMode: boolean;
}

const carouselTheme: CustomFlowbiteTheme['carousel'] = {
  control: {
    base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary8/40 group-hover:bg-white/50 group-hover:ring-4 group-hover:ring-primary1 group-focus:outline-none group-focus:ring-4 group-focus:ring-primary1 sm:h-10 sm:w-10",
    icon: "h-5 w-5 text-primary1 dark:text-gray-800 sm:h-6 sm:w-6"
  },
  indicators: {
    active: {
      off: "bg-primary7",
      on: "bg-primary2 border-white-600"
    }
  }
};

const ArtworkDetail = (props: Props) => {
  const { _id, images, name, price, description, likeCount, type } = props.item;
  const { onCloseDetail, isProfileEditMode } = props;

  const handleCloseDetail = () => {
    onCloseDetail();
  };

  return (
    <div className={style.artwork_detail}>
      <div className={style.image_gallery}>
        <Carousel key={_id} theme={carouselTheme} indicators={true} slide={false}>
          {images.map((item, index) => {
            return <img key={index} src={item} />;
          })}
        </Carousel>
      </div>
      <div className={`${style.detail}`}>
        <div onClick={handleCloseDetail} className={`${style.close}`}><span className="cursor-pointer"> X </span></div>
        <div className={style.name}>
          {name}
          {!isProfileEditMode && <>
            <span className={`${style.heart} cursor-pointer`}><FontAwesomeIcon icon={faHeart} className={style.heart_icon}></FontAwesomeIcon></span>
            <span className={`${style.bookmark} cursor-pointer`}><FontAwesomeIcon icon={faBookmark} className={style.bookmark_icon}></FontAwesomeIcon></span>
          </>}
        </div>
        <div className={style.category}>
          <span>{`Fan Art`}</span>
          <span>{`Character Design`}</span>
          <span>{`Infographic`}</span>
        </div>
        <div className={style.description}>
          <p>รายละเอียด</p>
          <span className="text-primary3">{description}</span>
        </div>
        <div className={style.price}>
          <span>{type == 'hired' ? 'เรทราคา :' : 'ราคา :'}</span>
          <span className={style.price_tag}>{price}</span>
        </div>
        <div className={style.heart}>
          <span>จำนวนที่ถูกใจ</span>
          <span className={style.heart_count}>{likeCount} ครั้ง</span>
        </div>
        <div className={style.profile}>
          <img src="../../ssi1/picture/user1.gif" />
          <div className={style.name_box}>
            <p className={style.username}>naphattt</p>
            <p className={style.fullname}>Naphat Nuansri</p>
          </div>
          <button className={`${style.btn} justify-self-end`}>View Profile</button>
        </div>

        {/* show only when freelance account click to see own detail */}
        {isProfileEditMode && (<>
          <button onClick={() => router.push('/login')}>edit artwork</button>
          <button onClick={() => {
            deleteArtwork(_id)
            window.location.reload()
          }}>delete artwork</button></>
        )}
      </div>
    </div>
  );
};

export default ArtworkDetail;