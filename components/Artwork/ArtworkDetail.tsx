import style from "@/styles/artwork/artworkLayout.module.scss";
import { Carousel } from "flowbite-react";

const ArtworkDetail = () => {
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/beartful-ef55a.appspot.com/o/cartoon1.jpeg?alt=media&token=98b9e198-2709-4f75-bc22-9e79d6d4bbc9&_gl=1*hiayej*_ga*OTU1MTIxMTUxLjE2OTg0ODk2Mzg.*_ga_CW55HF8NVT*MTY5ODUxNTQyNy40LjEuMTY5ODUxNjM2MS42MC4wLjA.",
    "https://firebasestorage.googleapis.com/v0/b/beartful-ef55a.appspot.com/o/cartoon4.jpeg?alt=media&token=eec6cf23-880a-462a-93a9-33f17765699f&_gl=1*fqk4cn*_ga*OTU1MTIxMTUxLjE2OTg0ODk2Mzg.*_ga_CW55HF8NVT*MTY5ODUxNTQyNy40LjEuMTY5ODUxNjM5My4yOC4wLjA.",
    "https://firebasestorage.googleapis.com/v0/b/beartful-ef55a.appspot.com/o/logo2.jpeg?alt=media&token=61849198-a41a-48ff-8e5a-94632cdea358&_gl=1*1qzrpra*_ga*OTU1MTIxMTUxLjE2OTg0ODk2Mzg.*_ga_CW55HF8NVT*MTY5ODUwODI1OC4yLjEuMTY5ODUwODc1OS4zNy4wLjA.",
  ];

  return (
    <div className={style.artwork_detail}>
      <div className="h-96 w-5/12">
        <Carousel slide={false}>
          {images.map((item) => {
            return <img src={item} />;
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default ArtworkDetail;
