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
}
const ArtworkItem = (props: Props) => {
  const { images, name, price, type } = props.item;
  const { onShowDetail } = props;

  const handleClickDetail = () => {
    onShowDetail(props.item);
  };

  return (
    <>
      <div className={styled.artwork_box} onClick={handleClickDetail}>
        <ArtworkImageContainer>
          <ArtworkName>{name}</ArtworkName>
          <ArtworkImage theme={{ src: images[0] }} />
          <ShopLinkButton>
            Maexzomeiei
            <IconArrow icon={faArrowUp} />
          </ShopLinkButton>
          <ShopPrice>{type == 'hired' ? 'เรทราคา :' : 'ราคา :'} {price}</ShopPrice>
        </ArtworkImageContainer>
      </div>
    </>
  );
};

export default ArtworkItem;
