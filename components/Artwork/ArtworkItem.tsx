import { Artwork } from "@/models/artwork";
import ArtworkImage, {
  ArtworkImageContainer,
  ArtworkName,
  IconArrow,
  ShopLinkButton,
  ShopPrice,
} from "./ArtworkStyled";
import styled from "@/styles/artwork/artworkLayout.module.scss";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { deleteArtwork } from "@/services/artwork/artwork.api";
interface Props {
  item: Artwork;
  onShowDetail: (item: Artwork) => void;
  isProfileEditMode: boolean;
}
const ArtworkItem = (props: Props) => {
  const { _id, images, name, price, type } = props.item;
  const { onShowDetail, isProfileEditMode } = props;

  const handleClickDetail = () => {
    onShowDetail(props.item);
  };

  return (
    <>
      <div className={styled.artwork_box} onClick={handleClickDetail}>
        <ArtworkImageContainer>
          <ArtworkName>{name}</ArtworkName>
          <ArtworkImage theme={{ src: images[0] }} />
          {!isProfileEditMode && <ShopLinkButton>
            Maexzomeiei
            <IconArrow icon={faArrowUp} />
          </ShopLinkButton>}
          <ShopPrice>{type == 'hired' ? 'เรทราคา :' : 'ราคา :'} {price}</ShopPrice>
          {isProfileEditMode && (<>
            <button>edit artwork</button>
            <button onClick={() => {
              deleteArtwork(_id)
              window.location.reload()
            }}>delete artwork</button>
          </>
          )}
        </ArtworkImageContainer>
      </div>
    </>
  );
};

export default ArtworkItem;
