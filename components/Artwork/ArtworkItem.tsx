import { Artwork } from "@/models/artwork";
import ArtworkImage, {
  ArtworkImageContainer,
  ArtworkName,
  ShopPrice,
} from "./ArtworkStyled";
import styled from "@/styles/artwork/artworkLayout.module.scss";

interface Props {
  item: Artwork;
  onShowDetail: (item: Artwork) => void;
}
const ArtworkItem = (props: Props) => {
  const { _id, images, name, price, type } = props.item;
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
          <ShopPrice>{type == 'hired' ? 'เรทราคา :' : 'ราคา :'} {price}</ShopPrice>
        </ArtworkImageContainer>
      </div>
    </>
  );
};

export default ArtworkItem;
