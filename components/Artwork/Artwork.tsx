import { Artwork } from "@/models/artwork";
import { fetchArtworkData } from "@/services/artwork/artwork.api";
import { useEffect, useState } from "react";
import style from "@/styles/artwork/artworkLayout.module.scss";
import ArtworkItem from "./ArtworkItem";
import ArtworkCategory from "./ArtworkCategory";
import ArtworkDetail from "./ArtworkDetail";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  username?: string;
  isProfileEditMode?: boolean;
}
const Artwork = (props: Props) => {
  const [artwork, setArtwork] = useState<Artwork[]>([]);
  const [artworkDetail, setArtworkDetail] = useState<Artwork>();
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [type, setType] = useState<string>('hired');
  const [isSpecificFreelance, setIsSpecificFreelance] = useState<boolean>(false);
  const { username = "" , isProfileEditMode = false } = props;

  useEffect(() => {
    const getData = async () => {
      setArtwork(await fetchArtworkData(page, type, isSpecificFreelance, username));
      setPage(2);
    };
    getData();
  }, [type, artworkDetail, isSpecificFreelance]);

  useEffect(() => {
    const isHaveUsername: boolean = (typeof username && username !== "undefined" && username.length > 0);
    setIsSpecificFreelance(isHaveUsername)
  }, [username]);

  const fetchData = async () => {
    const data = await fetchArtworkData(page, type, isSpecificFreelance, username);
    setArtwork((prevItems) => [...prevItems, ...data]);
    setHasMore(data.length > 0);
    setPage((prevPage) => prevPage + 1);
  };

  const onShowDetail = (item: Artwork) => {
    setArtwork([])
    setPage(1);
    setHasMore(true)
    setIsShowDetail(true);
    setArtworkDetail(item);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    },);
  };

  const onCloseDetail = () => {
    setIsShowDetail(false);
    console.log(type);
  };
  return (
    <div className="flex mt-8">
      <ArtworkCategory type={type} setType={setType} setPage={setPage} setArtwork={setArtwork} setHasMore={setHasMore} setIsShowDetail={setIsShowDetail} />
      <div className={style.container}>
        {type === 'hired' &&
          <div className={style.type_header}> HIRING </div>
        }
        {type === 'readyMade' &&
          <div className={style.type_header}> READY MADE </div>
        }
        {artwork.length === 0 &&
          <div className={style.no_artwork}> NO ARTWORK <br /> . . . . </div>
        }
        {isSpecificFreelance && (
          <div style={{ height: 200 }}></div>
          //ตรงรายละเอียดเพิ่มเติมเดะมาสร้าง component
        )}
        {isShowDetail && artworkDetail && (
          <ArtworkDetail item={artworkDetail} onCloseDetail={onCloseDetail} isProfileEditMode={isProfileEditMode} />
        )}
        {isShowDetail && artworkDetail && (
          <div className={style.text}>--------- คุณอาจชอบสิ่งนี้ ---------</div>
        )}
        <InfiniteScroll
          dataLength={artwork.length}
          next={fetchData}
          hasMore={hasMore}
          loader={""}
        >
          <div className={style.artwork_container}>
            {artwork?.map((item, index) => {
              return (
                <ArtworkItem
                  item={item}
                  key={index}
                  onShowDetail={onShowDetail}
                  isProfileEditMode={isProfileEditMode}
                />
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Artwork;
