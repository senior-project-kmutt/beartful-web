import styled from "styled-components";

export const ArtworkImage = styled.img.attrs((props) => ({
  src: props.theme.src,
}))`
  margin: 0;
  padding: 8px;
  border-radius: 16px;
  grid-row-end: ${(props) => props.theme.size};
`;

export default ArtworkImage;
