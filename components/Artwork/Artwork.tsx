import { fetchArtworkData, getArtwork, getFreelanceArtwork } from "@/services/artwork/artwork.api";
import { useEffect, useState } from "react";
import style from "@/styles/artwork/artworkLayout.module.scss";
import ArtworkItem from "./ArtworkItem";
import ArtworkCategory from "./ArtworkCategory";
import ArtworkDetail from "./ArtworkDetail";
import InfiniteScroll from "react-infinite-scroll-component";
import ArtworkList from "./ArtworkList";

interface Props {
  isProfileEditMode?: boolean;
}
const Artwork = (props: Props) => {
  const [type, setType] = useState<string>('hired');

  return (
    <div className="flex mt-8">
      <ArtworkCategory type={type} setType={setType} />
      <div className={style.container}>
        {type === 'hired' &&
          <div className={style.type_header}> HIRING </div>
        }
        {type === 'readyMade' &&
          <div className={style.type_header}> READY MADE </div>
        }
        <ArtworkList from="homepage" type={type} isProfileEditMode={props.isProfileEditMode} />
      </div>
    </div>
  );
};

export default Artwork;
