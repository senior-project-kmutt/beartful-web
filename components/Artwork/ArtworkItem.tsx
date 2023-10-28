import { Artwork } from "@/models/artwork";
import ArtworkImage from "./ArtworkImage";
import { useEffect, useState } from "react";
interface Props {
  item: Artwork;
}
const ArtworkItem = (props: Props) => {
  const item = props;
  const [rowSpan, setRowSpan] = useState<number>();

  useEffect(() => {
    const img = new Image();
    img.src = item.item.images[0];
    const container = document.getElementById("container");
    if (container) {
      const imageAspectRatio = img.naturalWidth / img.naturalHeight;
      const newRowSpan = Math.ceil(
        container.offsetWidth / imageAspectRatio / 10
      );
      setRowSpan(newRowSpan);
    }
  }, []);

  const style = {
    src: item.item.images[0],
    size: `span ${rowSpan}`,
  };

  return (
    <>
      <ArtworkImage id="container" theme={style} />
    </>
  );
};

export default ArtworkItem;
