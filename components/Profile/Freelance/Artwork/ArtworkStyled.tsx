import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ArtworkImageContainer = styled.div`
  position: relative;
  cursor: zoom-in;
  &:hover {
    img {
      filter: brightness(70%);
    }
    button {
      display: block;
    }
    span {
      display: block;
    }
    svg {
      display: block;
    }
  }
`;

export const ArtworkImage = styled.img.attrs((props) => ({
  src: props.theme.src,
}))``;

export const ShopLinkButton = styled.button`
  position: absolute;
  bottom: 28px;
  left: 3%;
  padding: 3px 8px;
  background-color: rgba(237, 162, 126, 100);
  color: white;
  cursor: pointer;
  display: none;
  z-index: 1;
  border-radius: 15px;
  text-decoration: underline;
`;

export const ArtworkName = styled.span`
  position: absolute;
  top: 10px;
  left: 3%;
  padding: 3px 8px;
  color: white;
  cursor: pointer;
  display: none;
  z-index: 1;
  font-weight: bold;
`;

export const ShopPrice = styled.span`
  position: absolute;
  bottom: 2px;
  left: 3%;
  padding: 3px 8px;
  color: white;
  cursor: pointer;
  display: none;
  z-index: 1;
`;

export const IconArrow = styled(FontAwesomeIcon)`
  color: white;
  z-index: 1;
  transform: rotate(45deg);
`;

export const Ellipsis = styled(FontAwesomeIcon)`
  position: absolute;
  padding: 3px 8px;
  color: white;
  top: 10px;
  right: 3%;
  z-index: 1;
  display: none;
  cursor: pointer;
`;

export const Dropdown = styled.div`
  position: absolute;
  z-index:10;
  background-color: white;
  border-radius: 5px;
  padding-left: 8px;
  width: 125px;
  top: 10px;
  right: 3%;
`;

export default ArtworkImage;
