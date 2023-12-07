import { Artwork } from "@/models/artwork";
import style from "@/styles/artwork/artworkLayout.module.scss";
import { Carousel } from "flowbite-react";

interface Props {
  item: Artwork;
  onCloseDetail: () => void;
}

const ArtworkDetail = (props: Props) => {
  const { images, name, price, description, likeCount, type } = props.item;
  const { onCloseDetail } = props;

  const handleCloseDetail = () => {
    onCloseDetail();
  };

  return (
    <div className={style.artwork_detail}>
      <div className={style.image_gallery}>
        <Carousel slide={false}>
          {images.map((item, index) => {
            return <img key={index} src={item} />;
          })}
        </Carousel>
      </div>
      <div className={`${style.detail}`}>
        <div className={style.name}>{name}</div>
        <div className={style.category}>
          <span>{`Fan Art`}</span>
          <span>{`Character Design`}</span>
          <span>{`Infographic`}</span>
        </div>
        <div className={style.description}>
          <p>รายละเอียด</p>
          <span>{description}</span>
        </div>
        <div className={style.price}>
          <span>{type == 'hired' ? 'เรทราคา :' : 'ราคา :'}</span>
          <span className={style.price_tag}>{price}</span>
        </div>
        <div className={style.heart}>
          <span>จำนวนที่ถูกใจ</span>
          <span className={style.heart_count}>{likeCount}</span>
        </div>
      </div>
      <div onClick={handleCloseDetail}>test close Detail click</div>
    </div>
  );
};

export default ArtworkDetail;
