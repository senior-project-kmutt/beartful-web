import { Artwork } from "@/models/artwork";
import style from "@/styles/artwork/artworkLayout.module.scss";
import { Carousel, CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
  item: Artwork;
  onCloseDetail: () => void;
}

// const carouselTheme: CustomFlowbiteTheme['carousel'] = {
//   control: {
//     "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary8/40 group-hover:bg-white/50 group-hover:ring-4 group-hover:ring-primary1 group-focus:outline-none group-focus:ring-4 group-focus:ring-primary1 sm:h-10 sm:w-10",
//     "icon": "h-5 w-5 text-primary1 dark:text-gray-800 sm:h-6 sm:w-6"
//   },
//   indicators: {
//     active: {
//       off: "bg-primary7",
//       on: "bg-primary2 border-white-600"
//     }
//   }
// };

// interface CustomFlowbiteTheme {
//   carousel: {
//     control: {
//       base: string;
//       icon: string;
//     };
//     indicators: {
//       active: {
//         off: string;
//         on: string;
//       };
//     };
//   };
// }

// interface CarouselProps {
//   key: string;
//   theme: CustomFlowbiteTheme['carousel'];
//   control: React.ReactNode;
//   indicators: boolean;
//   slide: boolean;
// }

// const Carousel: React.FC<CarouselProps> = ({ key, theme, control, indicators, slide, children }) => {
//   // Assume the implementation of the Carousel component

//   return (
//     <div>
//       {/* Your Carousel implementation here */}
//       {children}
//     </div>
//   );
// };

// interface YourComponentProps {
//   _id: string;
//   images: string[];
// }

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
// const YourComponent: React.FC<YourComponentProps> = ({ _id, images }) => {
//   const carouselTheme: CustomFlowbiteTheme['carousel'] = {
//     control: {
//       base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary8/40 group-hover:bg-white/50 group-hover:ring-4 group-hover:ring-primary1 group-focus:outline-none group-focus:ring-4 group-focus:ring-primary1 sm:h-10 sm:w-10",
//       icon: "h-5 w-5 text-primary1 dark:text-gray-800 sm:h-6 sm:w-6"
//     },
//     indicators: {
//       active: {
//         off: "bg-primary7",
//         on: "bg-primary2 border-white-600"
//       }
//     }
//   };
// }

const ArtworkDetail = (props: Props) => {
  const { _id, images, name, price, description, likeCount, type } = props.item;
  const { onCloseDetail } = props;

  const handleCloseDetail = () => {
    onCloseDetail();
  };

  return (
    <div className={style.artwork_detail}>
      <div className={style.image_gallery}>
        <Carousel key={_id} theme={carouselTheme} control="icon" indicators={true} slide={false}>
          {images.map((item, index) => {
            return <img key={index} src={item} />;
          })}
        </Carousel>
        {/* <Carousel key={_id} theme={carouselTheme} control={<YourIconComponent />} indicators={true} slide={false}>
          {images.map((item, index) => (
            <img key={index} src={item} alt={`Image ${index}`} />
          ))}
        </Carousel> */}
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
          <button className={`${style.btn} justify-self-end`}>View Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetail;


// const carouselTheme: CustomFlowbiteTheme['Carousel'] = {
//   "root": {
//     "base": "relative h-full w-full",
//     "leftControl": "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
//     "rightControl": "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none"
//   },
//   "indicators": {
//     "active": {
//       "off": "bg-white/50 hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
//       "on": "bg-white dark:bg-gray-800"
//     },
//     "base": "h-3 w-3 rounded-full",
//     "wrapper": "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3"
//   },
//   "item": {
//     "base": "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
//     "wrapper": {
//       "off": "w-full flex-shrink-0 transform cursor-default snap-center",
//       "on": "w-full flex-shrink-0 transform cursor-grab snap-center"
//     }
//   },
//   "control": {
//     "base": "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
//     "icon": "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
//   },
//   "scrollContainer": {
//     "base": "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
//     "snap": "snap-x"
//   }
// }