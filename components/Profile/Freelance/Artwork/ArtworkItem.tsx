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
import { IUser } from "@/pages/chat";
import Swal from "sweetalert2";

interface Props {
  item: Artwork;
  onShowDetail: (item: Artwork) => void;
}
const ArtworkItem = (props: Props) => {
  const { _id, images, name, price, type } = props.item;
  const { onShowDetail } = props;
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const dropdownRef = useRef(null);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || ""));
  }, []);

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

  const handleDeleteArtwork = async (artworkId: string) => {
    const token = localStorage.getItem("auth");
    if (token) {
      if (user) {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        try {
          deleteArtwork(artworkId, headers).subscribe((res: any) => {
            Swal.fire({
              icon: "success",
              title: "สร้างผลงานสำเร็จ",
              showConfirmButton: false,
              timer: 1500
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                window.location.reload()
              }
            });
          }, error => {
            if (error.response.status === 401) {
              Swal.fire({
                title: "ไม่มีสิทธ์เข้าถึงการดำเนินการนี้",
                icon: "warning"
              })
            } else if (error.response.status === 400) {
              Swal.fire({
                title: "ข้อมูลผิดพลาด",
                text: "โปรดตรวจสอบข้อมูลของคุณ",
                icon: "warning"
              })
            } else {
              Swal.fire({
                title: "เกิดข้อผิดพลาด",
                text: "โปรดลองใหม่อีกครั้ง",
                icon: "error"
              });
            }
          });
        } catch (error) {
          console.error("Error create Cart:", error);
        }
      }
    }
  }

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
                    handleDeleteArtwork(_id)
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
