import { Artwork } from "@/models/artwork";
import style from "@/styles/artwork/artworkLayout.module.scss";
import { Carousel, CustomFlowbiteTheme } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark, faCommentDots } from "@fortawesome/free-solid-svg-icons";
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
import { createChatRoom } from "@/services/chat/chat.api";
import { formattedPrice } from "@/core/tranform";

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
    Swal.fire({
      imageUrl: image,
      imageAlt: "A tall image",
      background: "rgba(255, 255, 255, 0)",
      showConfirmButton: false,
      customClass: {
        // popup: `${style.my_custom_modal_class}`,
        // image: `${style.my_custom_image_class}`
      },
    });
    // setImageFullScreen(image);
    // setShowFullScreen(true);
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
  }, [props.item]);

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
          console.error("เพิ่มสินค้าลงตะกร้าไม่สำเร็จ", error);
        }
      }
    }
  };

  const handleGoToChat = () => {
    if (user && profile) {
      const token = localStorage.getItem("auth");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const body = {
        paticipants: [
          user.username,
          profile.username
        ]
      }
      createChatRoom(body, headers).then(res => {
        router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/chat?chatRoom=${res._id}`);
      })
    }
  }

  return (
    <div className={`${style.artwork_detail}`}>
      {user?.role === "customer" && (
        <div className={style.freelance_profile}>
          <div className={style.profile}>
            <img src={profile?.profileImage} />
            <div className={style.name_box}>
              <p className={style.username}>{profile?.username}</p>
              <p className={style.fullname}>
                {profile?.firstname} {profile?.lastname}
              </p>
            </div>

          </div>
          <div className={style.button_container}>
            {/* <FontAwesomeIcon icon={faCommentDots} className={style.chat_icon} size="2xl" onClick={handleGoToChat} /> */}
            <button
              className={`${style.view_profile} justify-self-end`}
              onClick={() =>
                router.push(
                  `${process.env.NEXT_PUBLIC_BASEPATH}/user?username=${profile?.username}`
                )
              }
            >
              ดูโปรไฟล์
            </button>
            <div onClick={handleCloseDetail} className={`${style.close}`}>
              <span className="cursor-pointer"> X </span>
            </div>
          </div>
        </div>
      )}

      {user?.role === "freelance" && (<div onClick={handleCloseDetail} className={`${style.close}`}>
        <span className="cursor-pointer mt-5 right-1"> X </span>
      </div>)}
      {/* <div onClick={handleCloseDetail} className={`${style.close}`}>
        <span className="cursor-pointer"> X </span>
      </div> */}
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
        <div className={style.name}>
          {name}
        </div>
        <div className={style.category}>
          {categoryNames.map((name, index) => (
            <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-2 mb-1">{name}</span>
          ))}
        </div>
        <div className={style.description}>
          <span className="text-gray-600">{description}</span>
        </div>
        <div className={style.price}>
          <span className={style.price_tag}>{formattedPrice(parseInt(price, 10))} บาท</span>
          {type === "readyMade" && user?.role === "customer" && (
            <div className={style.quantity}>

              <button className={style.addToCart} onClick={handleAddToCart}>
                เพิ่มลงตะกร้า
              </button>
            </div>
          )}

          {type === "hired" && user?.role === "customer" && (
            <div className={style.quantity}>
              <button className={style.addToCart} onClick={() =>
                router.push(
                  `${process.env.NEXT_PUBLIC_BASEPATH}/user?username=${profile?.username}`
                )
              }>
                แชทกับฟรีแลนซ์
              </button>
            </div>
          )}
        </div>
        {/* {type === "readyMade" && user?.role === "customer" && (
          <div className={style.quantity}>
            <button className={style.addToCart} onClick={handleAddToCart}>
              เพิ่มลงตะกร้า
            </button>
          </div>
        )} */}

      </div>
    </div>
  );
};

export default ArtworkDetail;
