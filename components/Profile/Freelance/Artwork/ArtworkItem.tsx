import { Artwork } from "@/models/artwork";
import ArtworkImage, {
  ArtworkImageContainer,
  ArtworkName,
  ShopPrice,
  Ellipsis,
  Dropdown
} from "./ArtworkStyled";
import styled from "@/styles/profile/freelance/artwork/artworkLayout.module.scss";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import router from "next/router";
import { deleteArtwork } from "@/services/artwork/artwork.api";

interface Props {
  item: Artwork;
  onShowDetail: (item: Artwork) => void;
}
const ArtworkItem = (props: Props) => {
  const { _id, images, name, price, type } = props.item;
  const { onShowDetail } = props;
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const dropdownRef = useRef(null);

  const handleClickDetail = () => {
    onShowDetail(props.item);
  };

  const handleClickEllipsis = (e: any) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(e.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className={styled.artwork_box} onClick={handleClickDetail}>
        <ArtworkImageContainer>
          <Ellipsis icon={faEllipsis} onClick={handleClickEllipsis} />
          {showDropdown &&
            <Dropdown ref={dropdownRef}>
              <ul className="py-2">
                <li>
                  <button style={{ width: '100%', height: '100%', textAlign: 'left' }} onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/profile/artwork/edit/${_id}`)}>แก้ไขผลงาน</button>
                </li>
                <li>
                  <button style={{ width: '100%', height: '100%', textAlign: 'left', color: 'red' }} onClick={() => {
                    deleteArtwork(_id)
                    window.location.reload()
                  }}>ลบ</button>
                </li>
              </ul>
            </Dropdown>
          }

          <ArtworkName>{name}</ArtworkName>
          <ArtworkImage theme={{ src: images[0] }} />
          <ShopPrice>{type == 'hired' ? 'เรทราคา :' : 'ราคา :'} {price}</ShopPrice>
        </ArtworkImageContainer>
      </div>
    </>
  );
};

export default ArtworkItem;
