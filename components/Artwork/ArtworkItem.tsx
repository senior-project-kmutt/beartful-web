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
interface Props {
  item: Artwork;
  onShowDetail: (item: Artwork) => void;
  isProfileEditMode: boolean;
}
const ArtworkItem = (props: Props) => {
  const { images, name, price, type } = props.item;
  const { onShowDetail, isProfileEditMode } = props;

  const handleClickDetail = () => {
    onShowDetail(props.item);
  };

  return (
    <>
      <div className={styled.artwork_box} onClick={handleClickDetail}>
        <ArtworkImageContainer>
          {/* show only when freelance account click to see own detail แปะไว้ละมาจัดฮะ */}
          {isProfileEditMode && (<>
            <button>edit artwork</button>
            <button>delete artwork</button></>
          )}
          <ArtworkName>{name}</ArtworkName>
          <ArtworkImage theme={{ src: images[0] }} />
          {!isProfileEditMode && <ShopLinkButton>
            Maexzomeiei
            <IconArrow icon={faArrowUp} />
          </ShopLinkButton>}
          <ShopPrice>{type == 'hired' ? 'เรทราคา :' : 'ราคา :'} {price}</ShopPrice>
        </ArtworkImageContainer>
      </div>
    </>
  );
};

export default ArtworkItem;
