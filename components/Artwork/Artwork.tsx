import { Artwork } from "@/models/artwork";
import { fetchArtworkData } from "@/services/artwork/artwork.api";
import { useEffect, useState } from "react";
import style from "@/styles/artwork/artworkLayout.module.scss";
import ArtworkItem from "./ArtworkItem";
import ArtworkCategory from "./ArtworkCategory";
import ArtworkDetail from "./ArtworkDetail";
import InfiniteScroll from "react-infinite-scroll-component";

const Artwork = () => {
  const [artwork, setArtwork] = useState<Artwork[]>([]);
  const [artworkDetail, setArtworkDetail] = useState<Artwork>();
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [type, setType] = useState<string>('hired');

  useEffect(() => {
    const getData = async () => {
      setArtwork(await fetchArtworkData(page, type));
      setPage(2);
    };
    getData();
  }, [type, artworkDetail]);

  const fetchData = async () => {
    const data = await fetchArtworkData(page, type);
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
        {isShowDetail && artworkDetail && (
          <ArtworkDetail item={artworkDetail} onCloseDetail={onCloseDetail} />
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
