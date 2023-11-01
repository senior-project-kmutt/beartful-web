import { Artwork } from "@/models/artwork";
import ArtworkImage from "./ArtworkImage";
import { useEffect, useRef, useState } from "react";
import styled from "@/styles/artwork/artworkLayout.module.scss";
interface Props {
  item: Artwork;
}
const ArtworkItem = (props: Props) => {
  const item = props;

  const style = {
    src: item.item.images[0],
  };

  return (
    <>
      <div className={styled.artwork_box}>
        <ArtworkImage theme={style} />
      </div>
    </>
  );
};

export default ArtworkItem;
