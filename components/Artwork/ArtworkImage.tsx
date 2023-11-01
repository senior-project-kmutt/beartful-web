import styled from "styled-components";

export const ArtworkImage = styled.img.attrs((props) => ({
  src: props.theme.src,
}))``;

export default ArtworkImage;
