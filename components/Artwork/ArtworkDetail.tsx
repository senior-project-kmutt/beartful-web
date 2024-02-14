import { Artwork } from "@/models/artwork";
import style from "@/styles/artwork/artworkLayout.module.scss";
import { Carousel, CustomFlowbiteTheme } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import { createCart } from "@/services/cart/cart.api";
import { IUser } from "@/pages/chat";
import { ICartAdd } from "@/models/cart";

interface Props {
  item: Artwork;
  onCloseDetail: () => void;
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
  const { _id, images, name, price, description, likeCount, type, freelanceId } = props.item;
  const [user, setUser] = useState<IUser>();
  let [quantity, setQuantity] = useState<number>(1)
  const { onCloseDetail } = props;
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [imageFullScreen, setImageFullScreen] = useState("")

  const handleImageClick = (image: string) => {
    setImageFullScreen(image);
    setShowFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setShowFullScreen(false);
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || ""));
  }, []);

  const handleCloseDetail = () => {
    onCloseDetail();
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("auth");
    if (token) {
      if (user) {
        const cart: ICartAdd = {
          type: type,
          description: description,
          amount: parseInt(price),
          quantity: quantity,
          artworkId: _id,
          artworkName: name,
          freelanceId: freelanceId.toString()
        };
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        try {
          await createCart(cart, headers);
        } catch (error) {
          console.error("Error create Cart:", error);
        }
      }
    }
  }

  return (
    <div className={style.artwork_detail}>
      <div className={style.image_gallery}>
        <Carousel key={_id} theme={carouselTheme} indicators={true} slide={false}>
          {images.map((item, index) => {
            return <img key={index} src={item} onClick={() => handleImageClick(item)} />

          })}
        </Carousel>
        {showFullScreen && (
          <div
            className={`${style.fullscreen_overlay} active`}
            onClick={handleCloseFullScreen}
          >
            <div className={style.fullscreen_image}>
              {/* <Carousel key={_id} theme={carouselTheme} indicators={true} slide={false}> */}
                <img
                  className={style.image}
                  src={imageFullScreen}
                  alt="Full Screen"
                />
              {/* </Carousel> */}
            </div>
          </div>
        )}
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
          <span>{type == 'hired' ? 'เรทราคา :' : 'ราคา :'}</span>
          <span className={style.price_tag}>{price} บาท</span>
        </div>
        <div className={style.heart}>
          <span>จำนวน</span>
          <span className={style.heart_count}>{likeCount} ครั้ง</span>
        </div>
        {type === 'readyMade' && <div className={style.quantity}>
          <span>จำนวนที่ถูกใจ</span>
          <span className={style.quantityControll}>
            <button onClick={() => setQuantity(quantity -= 1)}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(parseInt(event.target.value))}
            />
            <button onClick={() => setQuantity(quantity += 1)}>+</button>
          </span>
          <button className={style.addToCart} onClick={handleAddToCart}>เพิ่มลงตะกร้า</button>
        </div>}
        <div className={style.profile}>
          <img src="../../ssi1/picture/user1.gif" />
          <div className={style.name_box}>
            <p className={style.username}>naphattt</p>
            <p className={style.fullname}>Naphat Nuansri</p>
          </div>
          <button className={`${style.btn} justify-self-end`}>View Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;