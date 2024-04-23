import { Artwork as ArtworkList } from "@/models/artwork";
import { getArtwork, getFreelanceArtwork } from "@/services/artwork/artwork.api";
import { useEffect, useState } from "react";
import style from "@/styles/artwork/artworkLayout.module.scss";
import ArtworkItem from "./ArtworkItem";
import ArtworkDetail from "./ArtworkDetail";
import InfiniteScroll from "react-infinite-scroll-component";
import FadeLoader from "react-spinners/FadeLoader";

interface Props {
  username?: string;
  from: string;
  type: string;
  category: string
}
const ArtworkList = (props: Props) => {
  const [artwork, setArtwork] = useState<ArtworkList[]>([]);
  const [artworkDetail, setArtworkDetail] = useState<ArtworkList>();
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState<boolean>(true);
  const { from, type, username, category } = props;

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data
        const data = await getArtworkData(1);
        setArtwork(data);
        setPage(2);
        setHasMore(true);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching artwork data:", error);
        setLoading(false);
      }
    };
    getData();
  }, [type, category]);

  useEffect(() => {
    onCloseDetail();
  }, [type, category]);

  const fetchData = async () => {
    const data = await getArtworkData(page);
    setArtwork((prevItems) => [...prevItems, ...data]);
    setHasMore(data.length > 0);
    setPage((prevPage) => prevPage + 1);
  };

  const getArtworkData = async (page: number) => {
    let response: ArtworkList[] = [];
    try {
      if (from === "homepage") {
        const res = await getArtwork(page, 50, type, category).toPromise();
          response = res.data;
      }
      if (from === "freelance") {
        if (username) {
          const res = await getFreelanceArtwork(username || '', page, 50, type).toPromise();
          response = res.data;
        }
      }
    } catch (error) {
      console.error("Error fetching artwork:", error);
    }
    return response;
  };

  const onShowDetail = (item: ArtworkList) => {
    setIsShowDetail(true);
    setArtworkDetail(item);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    },);
  };

  const onCloseDetail = () => {
    setIsShowDetail(false);
  };
  return (
    <div>
      {loading && (
        <div className={style.loader}>
          <FadeLoader color="#36d7b7" />
        </div>
      )}
      {artwork.length === 0 &&
        <div className={style.no_artwork}> พบกันเร็วๆนี้ <br /> . . . . </div>
      }
      {isShowDetail && artworkDetail && (
        <div className="fixed inset-0 overflow-auto mt-48">
          <ArtworkDetail item={artworkDetail} onCloseDetail={onCloseDetail} />
        </div>
      )}
      <InfiniteScroll
        dataLength={artwork.length}
        next={fetchData}
        hasMore={hasMore}
        loader={""}
      >
        <div className={`${style.artwork_container} ${isShowDetail ? style.artwork_container_show_detail : ''}`}>
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
  );
};

export default ArtworkList;
