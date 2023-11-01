import { Artwork } from "@/models/artwork";
import ArtworkImage from "./ArtworkImage";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
interface Props {
  item: Artwork;
}
const ArtworkItem = (props: Props) => {
  const item = props;
  const [rowSpan, setRowSpan] = useState<number>();
  const imgRef = useRef<HTMLImageElement | null>(null);

  const artworkLayout = () => {
    const img = new Image();
    img.src = item.item.images[0];
    if (imgRef.current) {
      imgRef.current.onload = () => {
        const imageAspectRatio = img.naturalWidth / img.naturalHeight;
        const newRowSpan = Math.ceil(
          (imgRef.current?.offsetWidth ?? 0) / imageAspectRatio / 10
        );
        if (newRowSpan !== null) {
          setRowSpan(newRowSpan);
        }
      };
    }
  }

  useEffect(() => {
    artworkLayout()
  }, []);

  const style = {
    src: item.item.images[0],
    size: `span ${rowSpan}`,
  };

  return (
    <>
      <ArtworkImage ref={imgRef} theme={style} />
    </>
  );
};

export default ArtworkItem;
