
import { useState } from "react";
import ArtworkList from "../Artwork/ArtworkList";
import NavBar from "../Layout/NavBar";
import UserSideBar from "./UserSideBar";

interface Props {
    username: string;
}

const FreelanceArtwork = (props: Props) => {
    const [type, setType] = useState<string>('hired');

    return (
        <>
            <NavBar />
            <div className="flex mt-8">
                <div className="w-4/6">
                    <UserSideBar type={type} setType={setType} />
                </div>
                {(type == 'hired' || type == 'readyMade' || type == '') && <ArtworkList from="freelance" type={type} username={props.username} />}
            </div>
        </>
    );
};

export default FreelanceArtwork;