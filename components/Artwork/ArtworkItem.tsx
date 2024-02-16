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
import router from "next/router";
import { useEffect, useState } from "react";
import { getUserByIdNotAuthen } from "@/services/user/user.api";
import { Users } from "@/models/users";

interface Props {
  item: Artwork;
  onShowDetail: (item: Artwork) => void;
}
const ArtworkItem = (props: Props) => {
  const { _id, images, name, price, type, freelanceId } = props.item;
  const [profile, setProfile] = useState<Users>();

  const { onShowDetail } = props;

  const handleClickDetail = () => {
    onShowDetail(props.item);
  };

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    getUserByIdNotAuthen(freelanceId).subscribe((res) => {
      const profile = {
        email: res.data.email,
        password: res.data.password,
        username: res.data.username,
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        profileImage: res.data.profileImage,
        role: res.data.role,
        phoneNumber: res.data.phoneNumber,
      };
      setProfile(profile);
    });
  };

  return (
    <>
      <div className={styled.artwork_box} onClick={handleClickDetail}>
        <ArtworkImageContainer>
          <ArtworkName>{name}</ArtworkName>
          <ArtworkImage theme={{ src: images[0] }} />
          {/* <ShopLinkButton onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASEPATH}/user/${profile?.username}`)}>
            Maexzomeiei
            <IconArrow icon={faArrowUp} />
          </ShopLinkButton> */}
          <ShopPrice>{type == 'hired' ? 'เรทราคา :' : 'ราคา :'} {price}</ShopPrice>
        </ArtworkImageContainer>
      </div>
    </>
  );
};

export default ArtworkItem;

