import { useState } from "react";
import ArtworkCategory from "./ArtworkCategory";
import ArtworkList from "./ArtworkList";

const Artwork = () => {
  const [type, setType] = useState<string>('hired');
  const [category, setCategory] = useState<string>('');

  return (
    <div>
      <ArtworkCategory type={type} setType={setType} category={category} setCategory={setCategory} />
      <ArtworkList from="homepage" type={type} category={category} />
    </div>
  );
};

export default Artwork;
