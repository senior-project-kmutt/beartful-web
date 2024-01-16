import { useState } from "react";
import ArtworkCategory from "../Artwork/ArtworkCategory";
import ArtworkList from "../Artwork/ArtworkList";

interface Props {
    username: string;
    isProfileEditMode?: boolean;
}

const FreelanceArtwork = (props: Props) => {
    const [type, setType] = useState<string>('hired');

    return (
        <div>
            <ArtworkCategory type={type} setType={setType} />
            <ArtworkList from="freelance" type={type} username={props.username} isProfileEditMode={true} />
        </div>
    );
};

export default FreelanceArtwork;