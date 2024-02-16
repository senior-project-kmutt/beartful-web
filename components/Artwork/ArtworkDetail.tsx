import { Artwork } from "@/models/artwork";
import style from "@/styles/artwork/artworkLayout.module.scss";
import { Carousel, CustomFlowbiteTheme } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { createCart } from "@/services/cart/cart.api";
import { IUser } from "@/pages/chat";
import { ICartAdd } from "@/models/cart";
import Swal from "sweetalert2";
import { Category } from "@/models/category";
import { getAllCategories } from "@/services/category/category.api";
import { getUserByIdNotAuthen } from "@/services/user/user.api";
import { Users } from "@/models/users";
import router from "next/router";

interface Props {
  item: Artwork;
  onCloseDetail: () => void;
}

const carouselTheme: CustomFlowbiteTheme["carousel"] = {
  control: {
    base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary8/40 group-hover:bg-white/50 group-hover:ring-4 group-hover:ring-primary1 group-focus:outline-none group-focus:ring-4 group-focus:ring-primary1 sm:h-10 sm:w-10",
    icon: "h-5 w-5 text-primary1 dark:text-gray-800 sm:h-6 sm:w-6",
  },
  indicators: {
    active: {
      off: "bg-primary7",
      on: "bg-primary2 border-white-600",
    },
  },
};

const ArtworkDetail = (props: Props) => {
  const {
    _id,
    images,
    name,
    price,
    description,
    likeCount,
    type,
    freelanceId,
    categoryId,
  } = props.item;
  const [user, setUser] = useState<IUser>();
  const [profile, setProfile] = useState<Users>();
  let [quantity, setQuantity] = useState<number>(1);
  const { onCloseDetail } = props;
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [imageFullScreen, setImageFullScreen] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const handleImageClick = (image: string) => {
    setImageFullScreen(image);
    setShowFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setShowFullScreen(false);
  };

  useEffect(() => {
    const user = localStorage.getItem("user") || "";
    if (user) {
      setUser(JSON.parse(user));
    }
    getUserInfo();
    getAllCategories().subscribe((res) => {
      setCategories(res.data as Category[]);
    });
  }, []);

  const handleCloseDetail = () => {
    onCloseDetail();
  };

  const getUserInfo = async () => {
    getUserByIdNotAuthen(freelanceId).subscribe((res) => {
      const profile = {
        email: res.data.email,
        password: res.data.password,
        username: res.data.username,
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        profileImage: res.data.profileImage,
        role: res.data.role,
        phoneNumber: res.data.phoneNumber,
      };
      setProfile(profile as Users);
    });
  };
  const categoryNames = categoryId.map((id) => {
    const category = categories.find((cat) => cat._id === id);
    return category ? category.name : "Unknown";
  });

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
          freelanceId: freelanceId.toString(),
        };
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        try {
          await createCart(cart, headers).subscribe((res) => {
            Swal.fire({
              icon: "success",
              title: "เพิ่มสินค้าลงตะกร้าสำเร็จ",
              showConfirmButton: false,
              timer: 1500,
            });
          });
        } catch (error) {
          console.error("Error create Cart:", error);
        }
      }
    }
  };

  return (
    <div className={style.artwork_detail}>
      <div className={style.image_gallery}>
        <Carousel
          key={_id}
          theme={carouselTheme}
          indicators={true}
          slide={false}
        >
          {images.map((item, index) => {
            return (
              <img
                key={index}
                src={item}
                onClick={() => handleImageClick(item)}
              />
            );
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
        <div onClick={handleCloseDetail} className={`${style.close}`}>
          <span className="cursor-pointer"> X </span>
        </div>
        <div className={style.name}>
          {name}
          <span className={`${style.heart} cursor-pointer`}>
            <FontAwesomeIcon
              icon={faHeart}
              className={style.heart_icon}
            ></FontAwesomeIcon>
          </span>
          <span className={`${style.bookmark} cursor-pointer`}>
            <FontAwesomeIcon
              icon={faBookmark}
              className={style.bookmark_icon}
            ></FontAwesomeIcon>
          </span>
        </div>
        <div className={style.category}>
          {categoryNames.map((name, index) => (
            <span key={index}>{name}</span>
          ))}
        </div>
        <div className={style.description}>
          <p>รายละเอียด</p>
          <span className="text-primary3">{description}</span>
        </div>
        <div className={style.price}>
          <span>{type == "hired" ? "เรทราคา :" : "ราคา"}</span>
          <span className={style.price_tag}>{price} บาท</span>
        </div>
        <div className={style.heart}>
          <span>จำนวนที่ถูกใจ</span>
          <span className={style.heart_count}>{likeCount} ครั้ง</span>
        </div>
        {type === "readyMade" && user?.role === "customer" && (
          <div className={style.quantity}>
            {/* <span>จำนวนที่ถูกใจ</span> */}
            {/* <span className={style.quantityControll}>
            <button onClick={() => setQuantity(quantity -= 1)}>-</button>
            <input
              type="number"
              value={quantity}
              onChange={(event) => setQuantity(parseInt(event.target.value))}
            />
            <button onClick={() => setQuantity(quantity += 1)}>+</button>
          </span> */}
            <button className={style.addToCart} onClick={handleAddToCart}>
              เพิ่มลงตะกร้า
            </button>
          </div>
        )}
        {user?.role === "customer" && (
          <div className={style.profile}>
            <img src={profile?.profileImage} />
            <div className={style.name_box}>
              <p className={style.username}>{profile?.username}</p>
              <p className={style.fullname}>
                {profile?.firstname} {profile?.lastname}
              </p>
            </div>
            <button
              className={`${style.btn} justify-self-end`}
              onClick={() =>
                router.push(
                  `${process.env.NEXT_PUBLIC_BASEPATH}/user/${profile?.username}`
                )
              }
            >
              View Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkDetail;
