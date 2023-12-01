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

  useEffect(() => {
    const getData = async () => {
      setArtwork(await fetchArtworkData(page));
      setPage(2);
    };
    getData();
  }, []);

  const fetchData = async () => {
    const data = await fetchArtworkData(page);
    setArtwork((prevItems) => [...prevItems, ...data]);
    setHasMore(data.length > 0);
    setPage((prevPage) => prevPage + 1);
  };

  const onShowDetail = (item: Artwork) => {
    setIsShowDetail(true);
    setArtworkDetail(item);
  };

  const onCloseDetail = () => {
    setIsShowDetail(false);
  };

  return (
    <div className="flex">
      <ArtworkCategory />
      <div className={style.container}>
        {isShowDetail && artworkDetail && (
          <ArtworkDetail item={artworkDetail} onCloseDetail={onCloseDetail} />
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
