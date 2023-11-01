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
}
const ArtworkItem = (props: Props) => {
  const { images, name, price } = props.item;

  return (
    <>
      <div className={styled.artwork_box}>
        <ArtworkImageContainer>
          <ArtworkName>{name}</ArtworkName>
          <ArtworkImage theme={{ src: images[0] }} />
          <ShopLinkButton>
            Maexzomeiei
            <IconArrow icon={faArrowUp} />
          </ShopLinkButton>
          <ShopPrice>เรทราคา : {price}</ShopPrice>
        </ArtworkImageContainer>
      </div>
    </>
  );
};

export default ArtworkItem;
