import { Artwork } from "@/models/artwork";
import { Category } from "@/models/category";
import { getAllCategories } from "@/services/category/category.api";
import style from "@/styles/artwork/artworkLayout.module.scss";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
interface Props {
  type: string;
  category: string;
  setType: Dispatch<SetStateAction<string>>;
  setCategory: Dispatch<SetStateAction<string>>;
  setPage?: Dispatch<SetStateAction<number>>;
  setArtwork?: Dispatch<SetStateAction<Artwork[]>>;
  setHasMore?: Dispatch<SetStateAction<boolean>>;
  setIsShowDetail?: Dispatch<SetStateAction<boolean>>;
}

const ArtworkCategory = (props: Props) => {
  const { setType, setCategory, setPage, setArtwork, setHasMore, setIsShowDetail, type, category } = props
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    getAllCategories().subscribe(res => {
      setCategories(res.data)
    })
  }, [])

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

  const handleScroll = (direction: string) => {
    const container = document.querySelector(`.${style.category_container}`);
    if (container) {
      const scrollAmount = 100;
      if (direction === "left") {
        container.scrollLeft -= scrollAmount;
      } else if (direction === "right") {
        container.scrollLeft += scrollAmount;
      }
    }
  };


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
      <div className="flex justify-between items-center mt-2">
        <div className="mr-2">
          <button className={style.arrow} onClick={() => handleScroll("left")}>
            <FontAwesomeIcon icon={faAngleLeft} size="xs" />
          </button>
        </div>
        {/* <div className='flex overflow-x-scroll whitespace-nowrap pb-4 hide-scroll-bar'> */}
        <div className={style.category_container}>
          <div className={`${style.category} ${category == '' &&`${style.active}`}`}>
            <button onClick={() => setCategory('')}>ทั้งหมด</button>
          </div>
          {categories.map((item) => (
            <div className={`${style.category} ${category == item._id &&`${style.active}`}`} key={item._id}>
              <button onClick={() => setCategory(item._id)}>{item.name}</button>
            </div>
          ))}
        </div>
        <div className="ml-2">
          <button className={style.arrow} onClick={() => handleScroll("right")}>
            <FontAwesomeIcon icon={faAngleRight} size="xs" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkCategory;
