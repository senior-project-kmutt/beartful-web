import { useState } from "react";
import ArtworkCategory from "./ArtworkCategory";
import ArtworkList from "./ArtworkList";

const Artwork = () => {
  const [type, setType] = useState<string>('hired');
  const [category, setCategory] = useState<string>('');

  return (
    <div>
      <div className="fixed inset-0 overflow-auto mt-12">
      <ArtworkCategory type={type} setType={setType} category={category} setCategory={setCategory} />
      </div>
      <div className="fixed inset-0 overflow-auto mt-40">
        <ArtworkList from="homepage" type={type} category={category} />
      </div>
    </div>
  );
};

export default Artwork;
