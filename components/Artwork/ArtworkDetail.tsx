import { Artwork } from "@/models/artwork";
import style from "@/styles/artwork/artworkLayout.module.scss";
import { Carousel } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart , faBookmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
  item: Artwork;
  onCloseDetail: () => void;
}

const ArtworkDetail = (props: Props) => {
  const { images, name, price, description, likeCount } = props.item;
  const { onCloseDetail } = props;

  const handleCloseDetail = () => {
    onCloseDetail();
  };

  return (
    <div className={style.artwork_detail}>
      <div className={style.image_gallery}>
        <Carousel className="bg-black" slide={false}>
          {images.map((item, index) => {
            return <img key={index} src={item} />;
          })}
        </Carousel>
      </div>
      <div className={`${style.detail}`}>
        <div onClick={handleCloseDetail} className={`${style.close}`}><span className="cursor-pointer"> X </span></div>
        <div className={style.name}>
          {name}
          <span className={`${style.heart} cursor-pointer`}><FontAwesomeIcon icon={faHeart} className={style.heart_icon}></FontAwesomeIcon></span>
          <span className={`${style.bookmark} cursor-pointer`}><FontAwesomeIcon icon={faBookmark} className={style.bookmark_icon}></FontAwesomeIcon></span>
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
          <span>เรทราคา</span>
          <span className={style.price_tag}>{price}</span>
        </div>
        <div className={style.heart}>
          <span>จำนวนที่ถูกใจ</span>
          <span className={style.heart_count}>{likeCount} ครั้ง</span>
        </div>
        <div className={style.profile}>
          <img src="../../picture/user1.gif" />
          <div className={style.name_box}>
            <p className={style.username}>naphattt</p>
            <p className={style.fullname}>Naphat Nuansri</p>
          </div>
          <button className={`${style.btn} justify-self-end`}>Go to Shop</button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;
