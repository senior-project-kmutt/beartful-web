import { useState } from "react";
import ArtworkCategory from "./ArtworkCategory";
import ArtworkList from "./ArtworkList";

const Artwork = () => {
  const [type, setType] = useState<string>('hired');

  return (
    <div>
      <div className="fixed inset-0 overflow-auto mt-12">
      <ArtworkCategory type={type} setType={setType} />
      </div>
      <div className="fixed inset-0 overflow-auto mt-40">
        <ArtworkList from="homepage" type={type} />
      </div>
      
    </div>
  );
};

export default Artwork;
