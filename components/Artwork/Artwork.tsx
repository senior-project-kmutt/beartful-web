import { useState } from "react";
import ArtworkCategory from "./ArtworkCategory";
import ArtworkList from "./ArtworkList";

const Artwork = () => {
  const [type, setType] = useState<string>('hired');

  return (
    <div>
      <ArtworkCategory type={type} setType={setType} />
      <ArtworkList from="homepage" type={type} />
    </div>
  );
};

export default Artwork;
