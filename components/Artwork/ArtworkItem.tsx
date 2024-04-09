import { Artwork } from "@/models/artwork";
import styled from "@/styles/artwork/artworkLayout.module.scss";

interface Props {
  item: Artwork;
  onShowDetail: (item: Artwork) => void;
}
const ArtworkItem = (props: Props) => {
  const { _id, images, name, price, type, freelanceId } = props.item;

  const { onShowDetail } = props;

  const handleClickDetail = () => {
    onShowDetail(props.item);
  };

  return (
    <>
      <div className={styled.artwork_box} onClick={handleClickDetail}>
        <div className="max-w-sm rounded overflow-hidden shadow-lg transform motion-safe:hover:scale-105">
          <img className="w-full" src={images[0]} alt={name} />
          <div className={styled.detail_artbox}>
            <img className="mr-2" src={images[0]} alt="Avatar of Jonathan Reinink" />
            <div className="text-sm">
              <p className="text-gray-900 leading-none">testusernameee</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtworkItem;

